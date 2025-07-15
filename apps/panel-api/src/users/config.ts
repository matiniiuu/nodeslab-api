import { User, UserDto, UserSchema } from '@app/shared';
import { IRepository, RepositoryToken } from '../repositories/users.repository';
import { RepositoryMongoDB } from '../repositories/mongodb/users.mongodb';

export type CreateDto = UserDto;
export type UpdateDto = UserDto;
export type ModelType = User;

export const RouteName = 'users';

export const ModelValue = User;
export const ModelSchema = UserSchema;

export const DocumentName = 'User';
export const ServiceTokenValue = 'UsersServiceToken';

export type IRepositoryValue = IRepository;
export const RepositoryTokenValue = RepositoryToken;
export const RepositoryMongoDBValue = RepositoryMongoDB;
