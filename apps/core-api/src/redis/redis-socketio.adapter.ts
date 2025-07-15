import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClientType } from 'redis';
import { Server, ServerOptions, Socket } from 'socket.io';

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;

    constructor() {
        super();
    }

    async connectToRedis(client: RedisClientType): Promise<void> {
        const subClient = client.duplicate();
        await subClient.connect();
        this.adapterConstructor = createAdapter(client, subClient);
    }

    createIOServer(port: number, options?: ServerOptions) {
        const server = super.createIOServer(port, options) as Server;
        server.adapter(this.adapterConstructor);
        return server;
    }
    bindClientConnect(
        server: Server,
        callback: (socket: Socket) => void,
    ): void {
        server.on('connection', callback);
    }
}
