import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('auth/google')
export class GoogleOauthController {
  constructor() {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req) {
    return req.user;
  }
}
