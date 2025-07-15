import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
    DocumentNotFound,
    DataReply,
    DataResponse,
    Region,
    RegionListRequestDto,
    RegionListResponseDto,
    RegionWithBundlesRequestDto,
} from '@app/shared';

import { IService } from './i.interface';
import {
    IRepository,
    RepositoryToken,
} from '../repositories/regions.repository';

@Injectable()
export class Service implements IService {
    @Inject(RepositoryToken)
    private readonly repository: IRepository;

    async findAll(dto: RegionListRequestDto): DataReply<RegionListResponseDto> {
        const result = await this.repository.findAll(dto);
        return new DataResponse(result);
    }
    async findOneWithBundles(
        dto: RegionWithBundlesRequestDto,
    ): DataReply<Region> {
        const result = await this.repository.findOneWithBundles(dto);
        if (!result) {
            throw new NotFoundException(DocumentNotFound('Region'));
        }
        return new DataResponse(result);
    }
}
