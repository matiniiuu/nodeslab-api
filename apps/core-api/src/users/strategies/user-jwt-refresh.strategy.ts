import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

import { config, User } from '@app/shared';

import { UserJwtPayload } from '../entities/auth.entity';
import {
    ServiceToken as UsersServiceToken,
    IService as IUsersService,
} from '../i.interface';

@Injectable()
export class UserJwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'user-jwt-refresh',
) {
    constructor(protected readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow(
                config.USER_JWT_REFRESH_SECRET,
            ),
        });
    }
    @Inject(UsersServiceToken)
    private readonly service: IUsersService;

    async validate(payload: UserJwtPayload): Promise<User | null> {
        return this.service.auth(payload.email);
    }
}
