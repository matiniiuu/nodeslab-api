import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';

import { LoginResponse } from '@app/shared';
import { ApiTags } from '@nestjs/swagger';
import {
    AuthServiceToken,
    IAuthService,
    RequestWithAdmin,
} from './auth.interface';
import { DocumentName } from './config';
import { AdminJwtRefreshAuthGuard } from './guards/admin-jwt-refresh-auth.guard';
import { AdminLocalAuthGuard } from './guards/admin-local-auth.guard';

@ApiTags(`${DocumentName} Auth`)
@Controller('auth')
export class AuthController {
    @Inject(AuthServiceToken)
    private readonly service: IAuthService;

    @UseGuards(AdminLocalAuthGuard)
    @Post('login')
    login(@Req() { user }: RequestWithAdmin) {
        return this.service.login(user);
    }

    @UseGuards(AdminJwtRefreshAuthGuard)
    @Post('refresh')
    refresh(@Req() { user, headers }: RequestWithAdmin) {
        return new LoginResponse(
            this.service.generateAccessToken(user),
            headers.authorization?.split(' ')[1] || '',
        );
    }
}
