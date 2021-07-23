import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { googleGaurd } from 'src/auth/google.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(googleGaurd)
  @Get('google/login')
  register(@Body() register) {
    return this.usersService.findOrCreate(register.email);
  }
}
