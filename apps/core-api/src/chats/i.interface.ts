import { Chat, ListReply, ListRequest } from '@app/shared';

export interface IService {
    list(userId: string, dto: ListRequest): ListReply<Chat>;

    getOrCreateChatId(from: string, to: string): Promise<string>;
    updateLastMessage(chatId: string, lastMessageId: string): Promise<void>;
}
export const ServiceToken = Symbol('ChatsServiceToken');
