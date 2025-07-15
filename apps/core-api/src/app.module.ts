import { Module } from '@nestjs/common';

import {
    AwsModule,
    DatabaseModule,
    EnvConfigModule,
    LoggerModule,
} from '@app/shared';

import RegionsModule from './regions/m.module';
import UsersModule from './users/m.module';

@Module({
    imports: [
        EnvConfigModule,
        LoggerModule,
        DatabaseModule,
        AwsModule,
        //* app api modules
        UsersModule,
        RegionsModule,
    ],
})
export class AppModule {}
