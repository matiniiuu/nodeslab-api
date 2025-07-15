// message.consumer.ts (in a separate process or same app)
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

import { PublishMessageDto, PublishReadReceiptDto } from '@app/shared';
import {
    ServiceToken as ChatServiceToken,
    IService as IChatService,
} from '../chats/i.interface';
import {
    IRepository,
    RepositoryToken,
} from '../repositories/messages.repository';

@Injectable()
export class MessageConsumer {
    constructor(
        @Inject(RepositoryToken) private readonly repository: IRepository,
        @Inject(ChatServiceToken) private readonly chatService: IChatService,
    ) {}
    @RabbitSubscribe({
        exchange: 'messages',
        routingKey: 'message.new',
        queue: 'messages.new.queue',
    })
    public async handleNewMessage(dto: PublishMessageDto) {
        const chatId = await this.chatService.getOrCreateChatId(
            dto.from,
            dto.to,
        );
        const messageId = await this.repository.create({ ...dto, chatId });
        await this.chatService.updateLastMessage(chatId, messageId);
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
