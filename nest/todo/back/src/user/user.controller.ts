import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
  @Get('id')
  async getOneById(@Query('id') id: number): Promise<User> {
    return this.userService.getOneById(id);
  }
  @Get('name')
  async getOneByName(@Query('name') name: string): Promise<User> {
    return this.userService.getOneByName(name);
  }
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('update')
  async updatePassword(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.updatePassword(createUserDto);
  }
  @Delete('delete')
  async deleteUser(@Body() id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
