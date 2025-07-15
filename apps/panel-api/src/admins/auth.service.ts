import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { config, LoginResponse } from '@app/shared';
import { IService } from './i.interface';
import { ServiceToken } from './i.interface';
import { IAuthService } from './auth.interface';

import { Admin } from './entities/admin.entity';
import { AdminJwtPayload } from './entities/auth.entity';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        protected readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    @Inject(ServiceToken)
    private readonly service: IService;

    async validateAdmin(
        email: string,
        password: string,
    ): Promise<Admin | null> {
        const user = await this.service.auth(email);
        if (!user) {
            return null;
        }
        const isPasswordsMatch = await bcrypt.compare(password, user.password);

        if (isPasswordsMatch) {
            return user;
        }
        return null;
    }
    login({ email }: Admin): LoginResponse {
        const { tokenPayload } = new AdminJwtPayload(email);
        const newRefreshToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get(config.ADMIN_JWT_REFRESH_SECRET),
            expiresIn: this.configService.get(
                config.ADMIN_JWT_REFRESH_EXPIRATION_TIME,
            ),
        });

        return new LoginResponse(
            this.jwtService.sign(tokenPayload),
            newRefreshToken,
        );
    }
    generateAccessToken({ email }: Admin): string {
        const { tokenPayload } = new AdminJwtPayload(email);

        return this.jwtService.sign(tokenPayload);
    }
}
