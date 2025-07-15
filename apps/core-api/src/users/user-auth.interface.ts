import { Request } from 'express';

import { DataReply, SuccessReply, User } from '@app/shared';

import { LoginResponse } from '@app/shared/dto/login.dto';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';

export interface IAuthService {
    register(dto: RegisterUserDto): SuccessReply;

    generateAccessToken(user: User): string;
    login(dto: LoginUserDto): DataReply<LoginResponse>;
}

export interface RequestWithUser extends Request {
    user: User;
}
export const AuthServiceToken = Symbol('UserAuthServiceToken');
