import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleGuard } from './google.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(GoogleGuard)
  @Get('google')
  async googleAuth() {}

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: Request) {
    return req.user;
  }
}
