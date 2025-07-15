import { ApiNotFoundResponse } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Headers,
    Inject,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';

import {
    Region,
    ApiOkResponseData,
    RegionListRequestDto,
    RegionListResponseDto,
    RegionWithBundlesRequestDto,
} from '@app/shared';

import { IService, ServiceToken } from './i.interface';
import { UserJwtAuthGuard } from '../users/guards/user-jwt-auth.guard';

@Controller('regions')
@UseGuards(UserJwtAuthGuard)
export class MainController {
    @Inject(ServiceToken)
    private readonly service: IService;

    @Get()
    @ApiOkResponseData(RegionListResponseDto)
    async findAll(
        @Headers('Accept-Language') acceptLanguage: string,
        @Query() dto: RegionListRequestDto,
    ) {
        return this.service.findAll({ ...dto, acceptLanguage });
    }

    @Get('/:regionCode/bundles')
    @ApiOkResponseData(Region)
    @ApiNotFoundResponse()
    findOne(
        @Headers('Accept-Language') acceptLanguage: string,
        @Param() dto: RegionWithBundlesRequestDto,
    ) {
        return this.service.findOneWithBundles({ ...dto, acceptLanguage });
    }
}
