import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import RequestWithUser from 'src/users/dto/requestWithUser.interface';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { isNotLoggedInGuard } from '../not-logged-in.guard';
import { GoogleOauthGuard } from './google-oauth.guard';

@ApiTags('google')
@Controller('api/auth/google')
export class GoogleOauthController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard, isNotLoggedInGuard)
  async googleAuth(@Req() req) {}

  @UseGuards(isNotLoggedInGuard, GoogleOauthGuard)
  @Redirect('http://localhost:3060')
  @Get('redirect')
  async googleAuthRedirect(@Req() req: RequestWithUser) {
    const accessTokenCookie = this.jwtAuthService.getCookieWithJwtAccessToken(
      req.user.userId,
    );
    const refreshTokenCookie = this.jwtAuthService.getCookieWithJwtRefreshToken(
      req.user.userId,
    );
    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return req.user;
  }
}
