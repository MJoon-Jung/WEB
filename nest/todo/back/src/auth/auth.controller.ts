import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { RegisterationData } from 'src/dto/register.request.dto';
import RequestWithUser from 'src/users/requestWithUser.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser) {
    const user = req.user;
    user.password = undefined;
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerationData: RegisterationData) {
    return this.authService.register(registerationData);
  }
}
