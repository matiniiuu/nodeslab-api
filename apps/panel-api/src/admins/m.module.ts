import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { config, DatabaseModule } from '@app/shared';

import { MainController } from './c.controller';
import { ServiceToken } from './i.interface';
import { Service } from './s.service';

import { AuthController } from './auth.controller';
import { AuthServiceToken } from './auth.interface';
import { AuthService } from './auth.service';

import { AdminJwtRefreshStrategy } from './strategies/admin-jwt-refresh.strategy';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';

import {
    ModelSchema,
    ModelValue,
    RepositoryMongoDBValue,
    RepositoryTokenValue,
} from './config';

@Module({
    exports: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryTokenValue, useClass: RepositoryMongoDBValue },
        { provide: AuthServiceToken, useClass: AuthService },
    ],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get(config.ADMIN_JWT_ACCESS_SECRET),
                signOptions: {
                    expiresIn: configService.get(
                        config.ADMIN_JWT_ACCESS_EXPIRATION_TIME,
                    ),
                },
            }),
        }),
        DatabaseModule.forFeature([
            { name: ModelValue.name, schema: ModelSchema },
        ]),
    ],
    controllers: [AuthController, MainController],
    providers: [
        { provide: ServiceToken, useClass: Service },
        { provide: RepositoryTokenValue, useClass: RepositoryMongoDBValue },
        { provide: AuthServiceToken, useClass: AuthService },

        AdminLocalStrategy,
        AdminJwtStrategy,
        AdminJwtRefreshStrategy,
    ],
})
export default class MainModule {}
