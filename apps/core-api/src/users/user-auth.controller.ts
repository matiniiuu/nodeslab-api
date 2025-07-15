import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';

import { LoginResponse } from '@app/shared';

import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { UserJwtRefreshAuthGuard } from './guards/user-jwt-refresh-auth.guard';
import { IService, ServiceToken } from './i.interface';
import {
    AuthServiceToken,
    IAuthService,
    RequestWithUser,
} from './user-auth.interface';

@Controller('auth')
export class AuthController {
    @Inject(AuthServiceToken)
    private readonly authService: IAuthService;

    @Inject(ServiceToken)
    private readonly service: IService;

    @Post('register')
    register(@Body() dto: RegisterUserDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @UseGuards(UserJwtRefreshAuthGuard)
    refresh(@Req() { user, headers }: RequestWithUser) {
        return new LoginResponse(
            this.authService.generateAccessToken(user),
            headers.authorization?.split(' ')[1] || '',
        );
    }
}
