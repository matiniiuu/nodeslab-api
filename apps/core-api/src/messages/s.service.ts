import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

import {
    PublishMessageDto,
    PublishReadReceiptDto,
    SendMessagePushNotificationDto,
} from '@app/shared';

import {
    IRepository,
    RepositoryToken,
} from '../repositories/messages.repository';
import { IService } from './i.interface';

@Injectable()
export class Service implements IService {
    constructor(
        @Inject(RepositoryToken) private readonly repository: IRepository,
        private readonly amqpConnection: AmqpConnection,
    ) {}

    async publishMessage(dto: PublishMessageDto): Promise<void> {
        await this.amqpConnection.publish('messages', 'message.new', dto);
    }
    async publishReadReceipt(dto: PublishReadReceiptDto): Promise<void> {
        await this.amqpConnection.publish('messages', 'message.read', {
            dto,
        });
    }

    async sendPushNotification(
        dto: SendMessagePushNotificationDto,
    ): Promise<void> {
        //! integrate with FCM/APNs
    }
}
