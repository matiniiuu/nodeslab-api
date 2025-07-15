import { Admin, AdminSchema } from './entities/admin.entity';
import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
import { RepositoryMongoDB } from '../repositories/mongodb/admins.mongodb';
import {
    IRepository,
    RepositoryToken,
} from '../repositories/admins.repository';

export type CreateDto = CreateAdminDto;
export type UpdateDto = UpdateAdminDto;
export type ModelType = Admin;

export const RouteName = 'admins';

export const ModelValue = Admin;
export const ModelSchema = AdminSchema;

export const DocumentName = 'Admin';
export const ServiceTokenValue = 'AdminsServiceToken';

export type IRepositoryValue = IRepository;
export const RepositoryTokenValue = RepositoryToken;
export const RepositoryMongoDBValue = RepositoryMongoDB;
