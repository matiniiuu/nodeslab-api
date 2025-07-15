import { IPanelRepository } from '@app/shared';

import { CreateAdminDto, UpdateAdminDto } from '../admins/dto/admin.dto';
import { Admin } from '../admins/entities/admin.entity';

export interface IRepository
    extends IPanelRepository<CreateAdminDto, UpdateAdminDto, Admin> {
    me(email: string): Promise<Admin | null>;
    auth(email: string): Promise<Admin | null>;
}
export const RepositoryToken = Symbol('AdminRepositoryToken');
