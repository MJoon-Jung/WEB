import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginRequestDto } from 'src/dto/login.request.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  async getAll(): Promise<Users[]> {
    return this.userService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
  @Get('id')
  async getOneById(@Query('id') id: number): Promise<Users> {
    return this.userService.getOneById(id);
  }
  @Get('name')
  async getOneByName(@Query('name') name: string): Promise<Users> {
    return this.userService.findUser(name);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async createUser(@Body() loginRequestDto: LoginRequestDto): Promise<Users> {
    return this.userService.createUser(loginRequestDto);
  }

  @Patch('update')
  async updatePassword(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.updatePassword(createUserDto);
  }
  @Delete('delete')
  async deleteUser(@Body() id: number): Promise<Users> {
    return this.userService.deleteUser(id);
  }
}
