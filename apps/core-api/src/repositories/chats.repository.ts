import { Chat, ListRepositoryDto, ListRequest } from '@app/shared';

export interface IRepository {
    create(from: string, to: string): Promise<Chat>;
    findOne(from: string, to: string): Promise<Chat | null>;

    updateLastMessage(chatId: string, lastMessageId: string): Promise<void>;

    findAll(userId: string, dto: ListRequest): ListRepositoryDto<Chat>;
}
export const RepositoryToken = Symbol('MessagesRepositoryToken');
