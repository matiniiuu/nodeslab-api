import {
    RegionListResponseDto,
    RegionListRequestDto,
    Region,
    RegionWithBundlesRequestDto,
} from '@app/shared';

export interface IRepository {
    findAll(dto: RegionListRequestDto): Promise<RegionListResponseDto>;
    findOneWithBundles(
        dto: RegionWithBundlesRequestDto,
    ): Promise<Region | null>;
}
export const RepositoryToken = Symbol('RegionsRepositoryToken');
