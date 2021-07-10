import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  users = [];
  getAll(id: string): string {
    return `getAll: ${id}`;
  }
  getOne(id: number): string {
    return `this action is ${id}`;
  }
  setOne(createUserDto: CreateUserDto): CreateUserDto[] {
    this.users.push(createUserDto);
    return this.users;
  }
}
