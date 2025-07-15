import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { LoggerConfig } from './logger-config';
const logger: LoggerConfig = new LoggerConfig();

@Module({
    imports: [WinstonModule.forRoot(logger.console())],
})
export class LoggerModule {}
