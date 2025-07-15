import { FastifyRequest } from 'fastify';
import { Admin } from './entities/admin.entity';

import { LoginResponse } from '@app/shared';

export interface IAuthService {
    generateAccessToken(user: Admin): string;
    login(user: Admin): LoginResponse;
    validateAdmin(email: string, password: string): Promise<Admin | null>;
}

export interface RequestWithAdmin extends FastifyRequest {
    user: Admin;
}
export const AuthServiceToken = Symbol('AdminAuthServiceToken');
