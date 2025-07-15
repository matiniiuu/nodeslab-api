// message.consumer.ts (in a separate process or same app)
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

import { PublishMessageDto, PublishReadReceiptDto } from '@app/shared';
import {
    IRepository,
    RepositoryToken,
} from '../repositories/messages.repository';

@Injectable()
export class MessageConsumer {
    constructor(
        @Inject(RepositoryToken) private readonly repository: IRepository,
    ) {}
    @RabbitSubscribe({
        exchange: 'messages',
        routingKey: 'message.new',
        queue: 'messages.new.queue',
    })
    public async handleNewMessage(dto: PublishMessageDto) {
        await this.repository.create(dto);
    }

    @RabbitSubscribe({
        exchange: 'messages',
        routingKey: 'message.read',
        queue: 'messages.read.queue',
    })
    public async handleReadReceipt(dto: PublishReadReceiptDto) {
        await this.repository.updateReadReceipt(dto);
    }
}
