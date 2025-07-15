import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
    CalculateOffset,
    Chat,
    ListRepositoryDto,
    ListRequest,
} from '@app/shared';

import { IRepository } from '../chats.repository';

@Injectable()
export class RepositoryMongoDB implements IRepository {
    constructor(@InjectModel(Chat.name) private model: Model<Chat>) {}
    async create(from: string, to: string): Promise<Chat> {
        return new this.model(from, to).save();
    }
    async findOne(from: string, to: string): Promise<Chat | null> {
        return this.model.findOne({
            $or: [
                { from: to, to: from },
                { from, to },
            ],
        });
    }

    async updateLastMessage(
        chatId: string,
        lastMessageId: string,
    ): Promise<void> {
        await this.model.updateOne(
            { _id: chatId },
            { $set: { lastMessageId } },
        );
    }

    async findAll(userId: string, dto: ListRequest): ListRepositoryDto<Chat> {
        const { limit, page, sort } = dto;
        return Promise.all([
            this.model
                .find<Chat>({ $or: [{ from: userId }, { to: userId }] })
                .sort({ createdAt: sort })
                .skip(CalculateOffset(page, limit))
                .limit(limit)
                .lean<Chat[]>(true),
            this.model.countDocuments().lean<number>(true),
        ]);
    }
}
