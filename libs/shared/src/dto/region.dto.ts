import { ListRequest } from './list.dto';
import { RegionTypeEnum } from '../enums';
import { Region } from '../models/region.entity';
import { AcceptLanguageDto } from './accept-language.dto';

import {
    IsOptionalBool,
    IsOptionalString,
    IsRequiredBool,
    IsRequiredEnum,
    IsRequiredInt,
    IsRequiredString,
    IsRequiredTranslation,
    IsRequiredTypedObjectArray,
} from '../decorators';

export class NetworkDto {
    @IsRequiredString() name: string;
    @IsRequiredString() type: string;
}
export class RegionDto {
    @IsRequiredTranslation() name: string;
    @IsRequiredString() iso2: string;
    @IsRequiredString() iso3: string;

    @IsRequiredBool() isPopular: boolean;
    @IsRequiredBool() isMostVisited: boolean;
    @IsRequiredBool() isActive: boolean;

    @IsRequiredString() flag: string;
    @IsOptionalString() banner: string;

    @IsRequiredInt() listOrderNumber: number;
    @IsRequiredEnum(RegionTypeEnum) regionType: RegionTypeEnum;

    @IsRequiredTypedObjectArray(NetworkDto) networks: NetworkDto[];
}
export class RegionWithBundlesRequestDto extends AcceptLanguageDto {
    @IsRequiredString() regionCode: string;
}
export class RegionListRequestDto extends ListRequest {
    @IsOptionalBool() isPopular?: boolean;
}
export class RegionListResponseDto {
    countries: Region[];
    regions: Region[];
    globals: Region[];
}
