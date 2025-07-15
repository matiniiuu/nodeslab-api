import { IdDto, ListRequest, ListRepositoryDto } from '@app/shared';
import { File } from '../files/entities/file.entity';

export interface IRepository {
    create(path: string, mimetype: string): Promise<void>;
    findAll(dto: ListRequest): ListRepositoryDto<File>;
    remove(dto: IdDto): Promise<void>;
}
export const RepositoryToken = Symbol('FileRepositoryToken');
