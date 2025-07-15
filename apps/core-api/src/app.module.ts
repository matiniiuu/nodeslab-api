import { Module } from '@nestjs/common';

import {
    AwsModule,
    DatabaseModule,
    EnvConfigModule,
    LoggerModule,
} from '@app/shared';

import MessagesModule from './messages/m.module';
import { RedisModule } from './redis/redis.module';
import UsersModule from './users/m.module';

@Module({
    imports: [
        EnvConfigModule,
        LoggerModule,
        DatabaseModule,
        AwsModule,
        RedisModule,
        //* app api modules
        UsersModule,
        MessagesModule,
    ],
})
export class AppModule {}
