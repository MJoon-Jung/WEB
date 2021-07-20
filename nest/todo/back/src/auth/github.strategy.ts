import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_REDIRECT_URI,
      scope: ['user:email'],
    });
  }

  // async validate(
  //   accessToken: string,
  //   refreshToken?: string,
  //   data: any,
  //   done: CallableFunction,
  // ) {
  //   return;
  // }
}
