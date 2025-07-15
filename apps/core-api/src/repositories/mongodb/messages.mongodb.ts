import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message, PublishMessageDto, PublishReadReceiptDto } from '@app/shared';

import { IRepository } from '../messages.repository';

@Injectable()
export class RepositoryMongoDB implements IRepository {
    constructor(@InjectModel(Message.name) private model: Model<Message>) {}
    async create(dto: PublishMessageDto): Promise<string> {
        return (await this.model.create(dto))._id;
    }
    async updateReadReceipt(dto: PublishReadReceiptDto): Promise<void> {
        await this.model.updateOne(
            { _id: dto.messageId },
            { $set: { isRead: true } },
        );
    }
}
