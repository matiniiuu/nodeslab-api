import {
    DataReply,
    Region,
    RegionListRequestDto,
    RegionListResponseDto,
    RegionWithBundlesRequestDto,
} from '@app/shared';

export interface IService {
    findAll(dto: RegionListRequestDto): DataReply<RegionListResponseDto>;
    findOneWithBundles(dto: RegionWithBundlesRequestDto): DataReply<Region>;
}
export const ServiceToken = Symbol('RegionsServiceToken');
