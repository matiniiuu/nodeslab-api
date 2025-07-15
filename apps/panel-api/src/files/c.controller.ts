import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';

import { IdDto, ListRequest } from '@app/shared';

import { ApiTags } from '@nestjs/swagger';
import { AdminJwtAuthGuard } from '../admins/guards/admin-jwt-auth.guard';
import { FileDto } from './dto/file.dto';
import { IService, ServiceToken } from './i.interface';

@ApiTags('Files')
@Controller('files')
@UseGuards(AdminJwtAuthGuard)
export class MainController {
    @Inject(ServiceToken)
    private readonly service: IService;

    @Post()
    @FormDataRequest({ storage: MemoryStoredFile })
    async create(@Body() dto: FileDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(@Query() params: ListRequest) {
        return this.service.findAll(params);
    }
    @Delete(':id')
    remove(@Param() dto: IdDto) {
        return this.service.remove(dto);
    }
}
