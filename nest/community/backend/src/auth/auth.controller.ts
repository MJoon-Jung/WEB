import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import RequestWithUser from 'src/users/dto/requestWithUser.interface';
import { JwtRefreshGuard } from './jwt/jwt-auth.refresh.guard';
import { User } from 'src/common/decorators/user.decorator';
import { isNotLoggedInGuard } from './not-logged-in.guard';
import { isLoggedInGuard } from './logged-in-guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.json({ userid: req.user.userId, logout: true });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      req.user.userId,
    );
    req.res.setHeader('Set-Cookie', accessTokenCookie);
    return { success: true };
  }

  @UseGuards(isLoggedInGuard, JwtAuthGuard)
  @Get()
  Authenticate(@User() user) {
    return user;
  }
}
