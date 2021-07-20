import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getCookieWithJwtAccessToken(id: number, name: string) {
    const payload: TokenPayload = { userId: id, userName: name };
    const token = this.jwtService.sign(payload);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
    return cookie;
  }
  getCookieWithJwtRefreshToken(id: number, name: string) {
    const payload: TokenPayload = { userId: id, userName: name };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;
    return cookie;
  }
}
