import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';

import { ApiOkResponseData, Chat, ListRequest, User } from '@app/shared';
import { GetUser } from '../users/decorators/get-user.decorator';
import { UserJwtAuthGuard } from '../users/guards/user-jwt-auth.guard';
import { IService, ServiceToken } from './i.interface';

@Controller('chats')
@UseGuards(UserJwtAuthGuard)
export class MainController {
    @Inject(ServiceToken)
    private readonly service: IService;

    @Get()
    @ApiOkResponseData(Chat)
    list(@Query() dto: ListRequest, @GetUser() user: User) {
        return this.service.list(user.id, dto);
    }
}
