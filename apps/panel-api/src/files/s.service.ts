import { Inject, Injectable } from '@nestjs/common';

import {
    AwsServiceToken,
    IAwsService,
    IdDto,
    ItemCreated,
    ItemDeleted,
    ListReply,
    ListRequest,
    ListResponse,
    SuccessReply,
    SuccessResponse,
    UploadDto,
} from '@app/shared';

import { FileDto } from './dto/file.dto';
import { IService } from './i.interface';
import { File } from './entities/file.entity';
import { RepositoryToken, IRepository } from '../repositories/files.repository';

@Injectable()
export class Service implements IService {
    @Inject(RepositoryToken)
    private readonly repository: IRepository;
    @Inject(AwsServiceToken)
    private readonly awsService: IAwsService;

    async create(dto: FileDto): SuccessReply {
        const uploadedImage = await this.awsService.upload(
            new UploadDto(dto.file.buffer, dto.file.originalName),
        );

        await this.repository.create(uploadedImage, dto.file.mimeType);
        return new SuccessResponse(ItemCreated);
    }

    async findAll(dto: ListRequest): ListReply<File> {
        const result = await this.repository.findAll(dto);
        return new ListResponse(...result);
    }
    async remove(dto: IdDto): SuccessReply {
        await this.repository.remove(dto);
        return new SuccessResponse(ItemDeleted);
    }
}
