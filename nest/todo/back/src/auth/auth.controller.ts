import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterationData } from 'src/dto/register.request.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  hi() {
    return 'hi';
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Res() res: Response) {
    const { cookie, access_token } =
      await this.authService.getCookieWithJwtToken(req.user);
    res.setHeader('Set-Cookie', cookie);
    return res.json({ access_token: access_token });
  }

  @Post('register')
  async register(@Body() registerationData: RegisterationData) {
    return this.authService.register(registerationData);
  }
}
