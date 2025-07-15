import { User, UserDto, IPanelRepository } from '@app/shared';

export interface IRepository extends IPanelRepository<UserDto, UserDto, User> {}
export const RepositoryToken = Symbol('UsersRepositoryToken');
