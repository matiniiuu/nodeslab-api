import {
    Controller,
    Get,
    Inject,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import {
    ApiOkResponseData,
    ApiOkResponseList,
    IdDto,
    ListRequest,
} from '@app/shared';

import { AdminJwtAuthGuard } from '../admins/guards/admin-jwt-auth.guard';
import { DocumentName, ModelValue, RouteName } from './config';
import { IService, ServiceToken } from './i.interface';

@ApiTags(DocumentName)
@Controller(RouteName)
@UseGuards(AdminJwtAuthGuard)
export class MainController {
    @Inject(ServiceToken)
    private readonly service: IService;

    @Get()
    @ApiOkResponseList(ModelValue)
    findAll(@Query() params: ListRequest) {
        return this.service.findAll(params);
    }

    @Get(':id')
    @ApiOkResponseData(ModelValue)
    @ApiNotFoundResponse()
    findOne(@Param() dto: IdDto) {
        return this.service.findOne(dto);
    }
}
