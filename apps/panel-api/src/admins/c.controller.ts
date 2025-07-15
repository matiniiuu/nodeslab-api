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
    Req,
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

import {
    CreateDto,
    DocumentName,
    ModelValue,
    RouteName,
    UpdateDto,
} from './config';

import { RequestWithAdmin } from './auth.interface';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { IService, ServiceToken } from './i.interface';

@ApiTags(DocumentName)
@Controller(RouteName)
@UseGuards(AdminJwtAuthGuard)
export class MainController {
    @Inject(ServiceToken)
    private readonly service: IService;

    @Post()
    @ApiCreatedResponse({ type: SuccessResponse })
    async create(@Body() dto: CreateDto) {
        return this.service.create(dto);
    }

    @Get('/me')
    @ApiOkResponseData(ModelValue)
    @ApiNotFoundResponse()
    me(@Req() request: RequestWithAdmin) {
        return this.service.me(request.user.email);
    }

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
