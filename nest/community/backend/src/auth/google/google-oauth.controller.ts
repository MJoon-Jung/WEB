import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { GoogleOauthGuard } from './google-oauth.guard';

@ApiTags('google')
@Controller('api/auth/google')
export class GoogleOauthController {
  constructor() {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@User() user) {
    return user;
  }
}
