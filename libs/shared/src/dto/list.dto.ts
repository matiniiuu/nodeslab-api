import { SortEnum } from '../enums/sort.enum';
import { AcceptLanguageDto } from './accept-language.dto';
import { IsOptionalEnum, IsOptionalInt, IsOptionalString } from '../decorators';

export class ListRequest extends AcceptLanguageDto {
    @IsOptionalEnum(SortEnum)
    sort: SortEnum = SortEnum.desc;

    @IsOptionalInt()
    page: number = 1;

    @IsOptionalInt()
    limit: number = 10;

    @IsOptionalString()
    searchText?: string;
}
