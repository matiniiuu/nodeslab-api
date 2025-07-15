// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
// import { ExecutionContext, Injectable } from '@nestjs/common';

// @Injectable()
// export class UserFirebaseAuthGuard extends AuthGuard('user-firebase-auth') {
//     constructor(private reflector: Reflector) {
//         super();
//     }

//     canActivate(context: ExecutionContext) {
//         const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
//             context.getHandler(),
//             context.getClass(),
//         ]);

//         if (isPublic) {
//             return true;
//         }

//         return super.canActivate(context);
//     }
// }
