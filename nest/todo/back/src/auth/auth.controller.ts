import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  HttpCode,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterationData } from 'src/dto/register.request.dto';
import RequestWithUser from 'src/users/requestWithUser.interface';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './jwt-auth-refresh.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalService } from './local.service';
import { GithubService } from './github.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly githubService: GithubService,
    private readonly localService: LocalService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      req.user.id,
      req.user.name,
    );
    req.res.setHeader('Set-Cookie', accessTokenCookie);
    return req.user;
  }

  @Get('github/callback')
  async githubLogin(@Query() code: string) {
    return this.githubService.githubLogin(code);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      req.user.id,
      req.user.name,
    );
    const refreshTokenCookie = this.authService.getCookieWithJwtRefreshToken(
      req.user.id,
      req.user.name,
    );
    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return res.json({ accessTokenCookie, refreshTokenCookie });
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.localService.getCookieForLogOut());
    return res.json({ userid: req.user.id, logout: true });
  }

  @Post('register')
  async register(@Body() registerationData: RegisterationData) {
    return this.localService.register(registerationData);
  }
}
