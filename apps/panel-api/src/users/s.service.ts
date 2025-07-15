import { Inject, Injectable } from '@nestjs/common';

import { PanelAbstractService } from '@app/shared';

import { IService } from './i.interface';
import {
    CreateDto,
    UpdateDto,
    ModelType,
    DocumentName,
    RepositoryTokenValue,
    IRepositoryValue,
} from './config';

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
}
