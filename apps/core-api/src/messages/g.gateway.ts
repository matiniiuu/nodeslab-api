import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { config } from '@app/shared';
import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CLIENT } from '../redis/redis.module';

import {
    IService as IMessageService,
    ServiceToken as MessageServiceToken,
} from './i.interface';

/*
Redis Key Schema:
- Hash: online_users (key: userId, value: socketId)

Socket.IO Events:
- send_message { to, content, messageId }
- new_message { from, content, messageId }
- typing { from, isTyping }
- read_receipt { messageId }

RabbitMQ:
- Exchange: messages (direct)
- Routing Keys: message.new, message.read

Database:
- Messages Collection/Table
- ReadReceipts

*/

@WebSocketGateway(9000, {
    namespace: 'chat',
    transports: ['websocket'],
    cors: { origin: '*' },
})
export class MessageGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

        @Inject(MessageServiceToken)
        private readonly messageService: IMessageService,
        @Inject(REDIS_CLIENT) private readonly redis: RedisClientType,
    ) {}

    async handleConnection(socket: Socket) {
        console.log('socket: user is trying to connect');
        const token = socket.handshake.query.authorization as string;
        const userId = socket.handshake.query.authorization as string;
        console.log('socket: user connection token', token);
        if (!token || !userId) socket.disconnect();
        try {
            const { email } = this.jwtService.verify(token, {
                secret: this.configService.get(config.USER_JWT_ACCESS_SECRET),
            });
            console.log('socket: users object', email);

            await this.redis.hSet('online_users', userId, socket.id);
        } catch (error) {
            console.log({ error });
            socket.disconnect();
        }
    }

    async handleDisconnect(socket: Socket) {
        const userId = socket.handshake.query.authorization as string;
        await this.redis.hDel('online_users', userId);
    }

    @SubscribeMessage('typing')
    async handleTyping(
        @MessageBody() { to, isTyping }: { to: string; isTyping: boolean },
    ) {
        const socketId = await this.redis.hGet('online_users', to);
        if (socketId) {
            this.server.to(socketId).emit('typing', { from: to, isTyping });
        }
    }

    @SubscribeMessage('send_message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: any,
    ) {
        const { to, content } = payload;
        const from = client.handshake.query.userId as string;
        //! Real-time delivery
        const socketId = await this.redis.hGet('online_users', to);
        if (socketId) {
            this.server.to(socketId).emit('new_message', { from, content });
        } else {
            //! trigger push notification for offline user
            this.messageService.sendPushNotification({ to, content });
        }

        //! publish to RabbitMQ
        await this.messageService.publishMessage({ from, to, content });
    }

    @SubscribeMessage('read_receipt')
    async handleReadReceipt(
        @ConnectedSocket() client: Socket,
        @MessageBody() { messageId, to }: { messageId: string; to: string },
    ) {
        const fromSocket = await this.redis.hGet('online_users', to);
        if (fromSocket) {
            this.server.to(fromSocket).emit('read_receipt', { messageId });
        }
        const readerId = client.handshake.query.userId as string;

        //! optionally persist read receipt
        await this.messageService.publishReadReceipt({ messageId });
    }
}
