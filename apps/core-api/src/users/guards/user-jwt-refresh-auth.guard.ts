import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserJwtRefreshAuthGuard extends AuthGuard('user-jwt-refresh') {}
