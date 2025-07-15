import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import {
    ApiOkResponseData,
    ApiOkResponseList,
    IdDto,
    ListRequest,
    SuccessResponse,
} from '@app/shared';

import { AdminJwtAuthGuard } from '../admins/guards/admin-jwt-auth.guard';
import {
    CreateDto,
    DocumentName,
    ModelValue,
    RouteName,
    UpdateDto,
} from './config';
import { IService, ServiceToken } from './i.interface';

@ApiTags(DocumentName)
@Controller(RouteName)
@UseGuards(AdminJwtAuthGuard)
export class AdminController {
    @Inject(ServiceToken)
    private readonly service: IService;

    @Post()
    @ApiCreatedResponse({ type: SuccessResponse })
    async create(@Body() dto: CreateDto) {
        return this.service.create(dto);
    }

    @Get()
    @ApiOkResponseList(ModelValue)
    findAll(@Query() dto: ListRequest) {
        return this.service.findAll(dto);
    }

    @Get(':id')
    @ApiOkResponseData(ModelValue)
    @ApiNotFoundResponse()
    findOne(@Param() dto: IdDto) {
        return this.service.findOne(dto);
    }

    @Put(':id')
    @ApiOkResponse({ type: SuccessResponse })
    @ApiNotFoundResponse()
    update(@Param() idDto: IdDto, @Body() dto: UpdateDto) {
        return this.service.update(idDto, dto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: SuccessResponse })
    remove(@Param() dto: IdDto) {
        return this.service.remove(dto);
    }
}
