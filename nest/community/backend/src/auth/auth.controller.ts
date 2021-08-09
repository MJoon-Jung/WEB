import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import RequestWithUser from 'src/users/dto/requestWithUser.interface';
import { JwtRefreshGuard } from './jwt/jwt-auth.refresh.guard';
import { User } from 'src/common/decorators/user.decorator';

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
    const accessToken = this.authService.getCookieWithJwtAccessToken(
      req.user.userId,
    );
    req.res.setHeader('Authorization', `Bearer ${accessToken}`);

    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  Authenticate(@User() user) {
    return user;
  }
}
