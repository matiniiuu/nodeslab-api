import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import {
    AwsModule,
    DatabaseModule,
    EnvConfigModule,
    LoggerModule,
} from '@app/shared';

import AdminModule from './admins/m.module';
import FilesModule from './files/m.module';
import LanguagesModule from './languages/m.module';
import UsersModule from './users/m.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        EnvConfigModule,
        LoggerModule,
        DatabaseModule,
        AwsModule,
        //* panel api modules
        AdminModule,
        LanguagesModule,
        FilesModule,
        UsersModule,
    ],
})
export class AppModule {}
