import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env-config';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, validationSchema })],
})
export class EnvConfigModule {}
