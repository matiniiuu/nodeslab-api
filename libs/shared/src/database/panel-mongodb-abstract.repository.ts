import { Model } from 'mongoose';

import { CalculateOffset } from '../helpers';
import { IdDto, ListRepositoryDto, ListRequest } from '../dto';
import { IPanelRepository } from './panel-abstract-repository.interface';

export abstract class MongodbAbstractRepository<CreateDto, UpdateDto, TDocument>
    implements IPanelRepository<CreateDto, UpdateDto, TDocument>
{
    constructor(protected readonly model: Model<TDocument>) {}

    async create(dto: CreateDto): Promise<void> {
        await this.model.create(dto);
    }

    async findAll(dto: ListRequest): ListRepositoryDto<TDocument> {
        const { limit, page, sort } = dto;
        return Promise.all([
            this.model
                .find<TDocument>()
                .sort({ createdAt: sort })
                .skip(CalculateOffset(page, limit))
                .limit(limit)
                .lean<TDocument[]>(true),
            this.model.countDocuments().lean<number>(true),
        ]);
    }

    async findOne({ id }: IdDto): Promise<TDocument | null> {
        return this.model.findById(id);
    }

    async update(idDto: IdDto, dto: UpdateDto): Promise<void> {
        await this.findOne(idDto);
        await this.model.updateOne(
            { _id: idDto.id },
            { $set: dto as Partial<TDocument> },
            { runValidators: true, context: 'query' },
        );
    }

    async remove(dto: IdDto): Promise<void> {
        await this.findOne(dto);
        await this.model.deleteOne({ _id: dto.id });
    }
}
