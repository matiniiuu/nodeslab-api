// redis.module.ts
import { config } from '@app/shared';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
    providers: [
        {
            provide: REDIS_CLIENT,
            useFactory: async (
                configService: ConfigService,
            ): Promise<RedisClientType> => {
                const client: RedisClientType = createClient({
                    url: configService.getOrThrow(config.REDIS_URL),
                    password: configService.getOrThrow(config.REDIS_PASSWORD),
                });
                await client.connect();
                return client;
            },
            inject: [ConfigService],
        },
    ],
    exports: [REDIS_CLIENT],
})
export class RedisModule {}
