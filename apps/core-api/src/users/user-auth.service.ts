import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
    config,
    DataReply,
    DataResponse,
    InvalidEmailOrPassword,
    ItemCreated,
    LoginResponse,
    SuccessReply,
    SuccessResponse,
    User,
} from '@app/shared';

import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { UserJwtPayload } from './entities/auth.entity';
import {
    IService as IUsersService,
    ServiceToken as UsersServiceToken,
} from './i.interface';
import { IAuthService } from './user-auth.interface';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        protected readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {}

    @Inject(UsersServiceToken)
    private readonly service: IUsersService;

    async register(dto: RegisterUserDto): SuccessReply {
        await this.service.create(dto);
        return new SuccessResponse(ItemCreated);
    }

    async login({ email, password }: LoginUserDto): DataReply<LoginResponse> {
        const user = await this.service.auth(email);
        if (!user) {
            throw new NotFoundException(InvalidEmailOrPassword);
        }
        const isPasswordsMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordsMatch) {
            throw new NotFoundException(InvalidEmailOrPassword);
        }
        const { tokenPayload } = new UserJwtPayload(user.email, `${user._id}`);
        const newRefreshToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.get(config.USER_JWT_REFRESH_SECRET),
            expiresIn: this.configService.get(
                config.USER_JWT_REFRESH_EXPIRATION_TIME,
            ),
        });

        return new DataResponse(
            new LoginResponse(
                this.jwtService.sign(tokenPayload),
                newRefreshToken,
            ),
        );
    }
    generateAccessToken({ email, id }: User): string {
        const { tokenPayload } = new UserJwtPayload(email, id);
        return this.jwtService.sign(tokenPayload);
    }
}
