import {
    Body,
    Controller,
    Get,
    Inject,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common';

import { ApiOkResponseData, User } from '@app/shared';

import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/user.dto';
import { UserJwtAuthGuard } from './guards/user-jwt-auth.guard';
import { IService, ServiceToken } from './i.interface';
import { RequestWithUser } from './user-auth.interface';

@ApiTags('User Profile')
@Controller('users')
@UseGuards(UserJwtAuthGuard)
export class MainController {
    @Inject(ServiceToken)
    private readonly service: IService;

    @Get('profile')
    @ApiOkResponseData(User)
    @ApiNotFoundResponse()
    profile(@Req() request: RequestWithUser) {
        return this.service.profile(request.user.email);
    }

    @Patch()
    @ApiOkResponseData(User)
    @ApiNotFoundResponse()
    update(@Req() request: RequestWithUser, @Body() dto: UpdateProfileDto) {
        return this.service.update(request.user.email, dto);
    }
}
