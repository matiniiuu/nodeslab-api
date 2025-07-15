import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import {
    DataReply,
    DataResponse,
    DocumentNotFound,
    IdDto,
    PanelAbstractService,
    SuccessReply,
} from '@app/shared';

import {
    CreateDto,
    DocumentName,
    IRepositoryValue,
    ModelType,
    RepositoryTokenValue,
    UpdateDto,
} from './config';
import { IService } from './i.interface';

@Injectable()
export class Service
    extends PanelAbstractService<
        CreateDto,
        UpdateDto,
        ModelType,
        IRepositoryValue
    >
    implements IService
{
    constructor(
        @Inject(RepositoryTokenValue)
        protected readonly repository: IRepositoryValue,
    ) {
        super(repository, DocumentName);
    }

    async me(email: string): DataReply<ModelType> {
        const result = await this.repository.me(email);
        if (!result) {
            throw new NotFoundException(DocumentNotFound(DocumentName));
        }
        return new DataResponse(result);
    }
    async auth(email: string): Promise<ModelType | null> {
        return this.repository.auth(email);
    }

    async update(idDto: IdDto, dto: UpdateDto): SuccessReply {
        if (dto.password) dto.password = await bcrypt.hash(dto.password, 12);
        return super.update(idDto, dto);
    }
}
