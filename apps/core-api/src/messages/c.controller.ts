import { Controller, Inject, UseGuards } from '@nestjs/common';

import { UserJwtAuthGuard } from '../users/guards/user-jwt-auth.guard';
import { IService, ServiceToken } from './i.interface';

@Controller('messages')
@UseGuards(UserJwtAuthGuard)
export class MainController {
    @Inject(ServiceToken)
    private readonly service: IService;
}
