// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { Request } from 'express';
// import * as dotenv from 'dotenv';
// import { UsersService } from 'src/users/users.service';

// dotenv.config();

// @Injectable()
// export class JwtRefreshTokenStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh-token',
// ) {
//   constructor(private readonly userService: UsersService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (request: Request) => {
//           return request?.cookies?.Refresh;
//         },
//       ]),
//       secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
//       passReqToCallback: true,
//     });
//   }

//   async validate(req: Request, payload: TokenPayload): Promise<any> {
//     const user = await this.userService.getById(payload.userId);
//     const { password, ...withOutPassword } = user;
//     console.log(withOutPassword);
//     return withOutPassword;
//   }
// }
