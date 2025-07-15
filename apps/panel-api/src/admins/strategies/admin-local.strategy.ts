import { Strategy } from 'passport-local';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Admin } from '../entities/admin.entity';
import { AuthServiceToken, IAuthService } from '../auth.interface';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
    Strategy,
    'admin-local',
) {
    @Inject(AuthServiceToken)
    private readonly authService: IAuthService;

    constructor() {
        super({
            usernameField: 'email',
        });
    }
    async validate(email: string, password: string): Promise<Admin | null> {
        return this.authService.validateAdmin(email, password);
    }
}
