import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import {
    AwsModule,
    config,
    DatabaseModule,
    User,
    UserSchema,
} from '@app/shared';

import { MainController } from './c.controller';
import { ServiceToken } from './i.interface';
import { Service } from './s.service';
import { UserJwtRefreshStrategy } from './strategies/user-jwt-refresh.strategy';
import { UserJwtStrategy } from './strategies/user-jwt.strategy';
import { AuthController } from './user-auth.controller';
import { AuthServiceToken } from './user-auth.interface';
import { AuthService } from './user-auth.service';

@Module({
    exports: [
        { provide: ServiceToken, useClass: Service },
        { provide: AuthServiceToken, useClass: AuthService },
    ],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get(config.USER_JWT_ACCESS_SECRET),
                signOptions: {
                    expiresIn: configService.get(
                        config.USER_JWT_ACCESS_EXPIRATION_TIME,
                    ),
                },
            }),
        }),
        DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AwsModule,
        // PassportModule
    ],
    controllers: [AuthController, MainController],
    providers: [
        { provide: ServiceToken, useClass: Service },
        { provide: AuthServiceToken, useClass: AuthService },
        UserJwtStrategy,
        UserJwtRefreshStrategy,
        // UserFirebaseAuthStrategy
    ],
})
export default class MainModule {}
