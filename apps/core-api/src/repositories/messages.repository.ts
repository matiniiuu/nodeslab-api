import { PublishMessageDto, PublishReadReceiptDto } from '@app/shared';

export interface IRepository {
    create(dto: PublishMessageDto): Promise<string>;
    updateReadReceipt(dto: PublishReadReceiptDto): Promise<void>;
}
export const RepositoryToken = Symbol('MessagesRepositoryToken');
