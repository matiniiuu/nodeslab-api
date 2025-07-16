import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import {
    AwsModule,
    DatabaseModule,
    EnvConfigModule,
    LoggerModule,
} from '@app/shared';

import { RedisModule } from './redis/redis.module';

import ChatsModule from './chats/m.module';
import MessagesModule from './messages/m.module';
import UsersModule from './users/m.module';

@Module({
    imports: [
        EnvConfigModule,
        LoggerModule,
        DatabaseModule,
        AwsModule,
        RedisModule,
        ScheduleModule.forRoot(),

        //* app api modules
        UsersModule,
        MessagesModule,
        ChatsModule,
    ],
})
export class AppModule {}
