import { IdDto, ListRequest } from '@app/shared';
import { ListRepositoryDto } from '../dto';

export interface IPanelRepository<CreateDto, UpdateDto, Model> {
    //! CRUD
    create(dto: CreateDto): void;
    findOne(dto: IdDto): Promise<Model | null>;
    findAll(dto: ListRequest): ListRepositoryDto<Model>;

    update(idDto: IdDto, dto: UpdateDto): void;

    remove(dto: IdDto): void;
}
