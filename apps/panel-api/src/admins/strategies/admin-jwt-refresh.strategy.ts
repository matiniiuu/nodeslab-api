import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

import { config } from '@app/shared';

import { Admin } from '../entities/admin.entity';
import { IService, ServiceToken } from '../i.interface';

@Injectable()
export class AdminJwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'admin-jwt-refresh',
) {
    constructor(protected readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow(
                config.ADMIN_JWT_REFRESH_SECRET,
            ),
        });
    }
    @Inject(ServiceToken)
    private readonly service: IService;

    async validate(payload: any): Promise<Admin | null> {
        return this.service.auth(payload.email);
    }
}
