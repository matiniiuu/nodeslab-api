import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { IService, ServiceToken } from './i.interface';

@Injectable()
export class AutoMessageScheduler {
    private readonly logger = new Logger(AutoMessageScheduler.name);

    constructor(@Inject(ServiceToken) private readonly service: IService) {}

    @Cron('0 2 * * *') // Every day at 2:00 AM
    async handleCron() {
        this.logger.log('Running scheduled auto-message generation');
        const count = await this.service.generateMessages();
        this.logger.log(`Generated ${count} auto messages`);
    }
}
