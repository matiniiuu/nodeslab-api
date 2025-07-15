import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '@app/shared';

/**
 * Returns user
 */
export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request: { user: User } = ctx.switchToHttp().getRequest();

        return request.user;
    },
);
