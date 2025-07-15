// import { auth } from 'firebase-admin';
// import { Reflector } from '@nestjs/core';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-firebase-jwt';

// @Injectable()
// export class UserFirebaseAuthStrategy extends PassportStrategy(
//     Strategy,
//     'user-firebase-auth',
// ) {
//     constructor(private readonly reflector: Reflector) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         });
//     }

//     async validate(token: string) {
//         try {
//             const user = await auth().verifyIdToken(token, true);
//             return user;
//         } catch (error) {
//             return false;
//         }
//     }
// }
