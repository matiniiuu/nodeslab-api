import { Inject, Injectable } from '@nestjs/common';

import { Chat, ListReply, ListRequest, ListResponse } from '@app/shared';
import { IRepository, RepositoryToken } from '../repositories/chats.repository';
import { IService } from './i.interface';

@Injectable()
export class Service implements IService {
    constructor(
        @Inject(RepositoryToken) private readonly repository: IRepository,
    ) {}
    async list(userId: string, dto: ListRequest): ListReply<Chat> {
        const [result, total] = await this.repository.findAll(userId, dto);
        return new ListResponse(result, total);
    }

    async getOrCreateChatId(from: string, to: string): Promise<string> {
        const chat = await this.repository.findOne(from, to);
        if (chat) {
            return chat._id;
        }
        return (await this.repository.create(from, to))._id;
    }

    updateLastMessage(chatId: string, lastMessageId: string): Promise<void> {
        return this.repository.updateLastMessage(chatId, lastMessageId);
    }
}
