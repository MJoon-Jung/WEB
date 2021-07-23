import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { googleGuard } from './google.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(googleGuard)
  @Get('login/google/callback')
  login() {
    return 'success';
  }
}
