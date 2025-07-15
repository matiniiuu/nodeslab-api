import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {
    CalculateOffset,
    IdDto,
    ListRequest,
    ListRepositoryDto,
} from '@app/shared';

import { IRepository } from '../files.repository';
import { File } from '../../files/entities/file.entity';

@Injectable()
export class RepositoryMongoDB implements IRepository {
    constructor(@InjectModel(File.name) private model: Model<File>) {}

    async create(path: string, mimetype: string): Promise<void> {
        await this.model.create({ path, mimetype });
    }

    async findAll(dto: ListRequest): ListRepositoryDto<File> {
        const { limit, page, sort } = dto;

        return Promise.all([
            this.model
                .find<File>()
                .sort({ createdAt: sort })
                .skip(CalculateOffset(page, limit))
                .limit(limit)
                .lean<File[]>(true),
            this.model.countDocuments().lean<number>(true),
        ]);
    }
    async remove(dto: IdDto): Promise<void> {
        await this.model.deleteOne({ _id: dto.id });
    }
}
