import { NotFoundException } from '@nestjs/common';

import { IPanelRepository } from '../database';
import { IPanelService } from './panel-abstract-service.interface';
import {
    DocumentNotFound,
    ItemCreated,
    ItemDeleted,
    ItemUpdated,
} from '../messages';
import {
    DataReply,
    DataResponse,
    IdDto,
    ListReply,
    ListRequest,
    ListResponse,
    SuccessReply,
    SuccessResponse,
} from '../dto';

export abstract class PanelAbstractService<
    CreateDto,
    UpdateDto,
    TDocument,
    IRepository extends IPanelRepository<CreateDto, UpdateDto, TDocument>,
> implements IPanelService<CreateDto, UpdateDto, TDocument>
{
    constructor(
        protected readonly repository: IRepository,
        protected readonly documentName?: string,
    ) {}

    async create(dto: CreateDto): SuccessReply {
        await this.repository.create(dto);
        return new SuccessResponse(ItemCreated);
    }

    async findAll(dto: ListRequest): ListReply<TDocument> {
        const result = await this.repository.findAll(dto);
        return new ListResponse<TDocument>(...result);
    }

    async findOne(dto: IdDto): DataReply<TDocument> {
        const result = await this.repository.findOne(dto);
        if (!result) {
            throw new NotFoundException(DocumentNotFound(this.documentName));
        }
        return new DataResponse(result);
    }

    async update(idDto: IdDto, dto: UpdateDto): SuccessReply {
        await this.findOne(idDto);
        await this.repository.update(idDto, dto);
        return new SuccessResponse(ItemUpdated);
    }

    async remove(dto: IdDto) {
        await this.findOne(dto);
        await this.repository.remove(dto);
        return new SuccessResponse(ItemDeleted);
    }
}
