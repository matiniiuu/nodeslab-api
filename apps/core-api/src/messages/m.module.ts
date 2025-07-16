import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { config, DatabaseModule, Message, MessageSchema } from '@app/shared';

import ChatsModule from '../chats/m.module';

import { RepositoryToken } from '../repositories/messages.repository';
import { RepositoryMongoDB } from '../repositories/mongodb/messages.mongodb';
import { MessageConsumer } from './c.consumer';
import { MessageGateway } from './g.gateway';
import { ServiceToken } from './i.interface';
import { Service } from './s.service';

@Module({
    exports: [
        MessageGateway,
        MessageConsumer,
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
    imports: [
        JwtModule.register({}),
        RabbitMQModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                exchanges: [{ name: 'messages', type: 'direct' }],
                uri: configService.getOrThrow(config.RABBITMQ_URI),
                connectionInitOptions: { wait: true, timeout: 10000 },
            }),
            inject: [ConfigService],
        }),
        DatabaseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
        ]),
        ChatsModule,
    ],
    providers: [
        MessageGateway,
        MessageConsumer,
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryToken, useClass: RepositoryMongoDB },
    ],
})
export default class MainModule {}
