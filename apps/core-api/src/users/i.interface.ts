import { DataReply, SuccessReply, User } from '@app/shared';

import { RegisterUserDto, UpdateProfileDto } from './dto/user.dto';

export interface IService {
    create(dto: RegisterUserDto): SuccessReply;
    profile(email: string): DataReply<User>;
    update(email: string, dto: UpdateProfileDto): SuccessReply;
    auth(email: string): Promise<User | null>;
}
export const ServiceToken = Symbol('UsersServiceToken');
