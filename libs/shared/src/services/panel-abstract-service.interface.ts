import { IdDto, ListRequest } from '@app/shared';
import { DataReply, ListReply, SuccessReply } from '../dto';

export interface IPanelService<CreateDto, UpdateDto, Model> {
    //! CRUD
    create(dto: CreateDto): SuccessReply;
    findOne(dto: IdDto): DataReply<Model>;
    findAll(dto: ListRequest): ListReply<Model>;

    update(idDto: IdDto, dto: UpdateDto): SuccessReply;

    remove(dto: IdDto): SuccessReply;
}
