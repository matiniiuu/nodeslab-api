import { IdDto, ListReply, ListRequest, SuccessReply } from '@app/shared';

import { FileDto } from './dto/file.dto';
import { File } from './entities/file.entity';

export interface IService {
    create(dto: FileDto): SuccessReply;
    findAll(dto: ListRequest): ListReply<File>;
    remove(dto: IdDto): SuccessReply;
}
export const ServiceToken = Symbol('FileServiceToken');
