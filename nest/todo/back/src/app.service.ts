import { Injectable } from '@nestjs/common';
import { RegisterationData } from './dto/register.request.dto';

@Injectable()
export class AppService {
  users = [];
  getAll(id: string): string {
    return `getAll: ${id}`;
  }
  getOne(id: number): string {
    return `this action is ${id}`;
  }
  setOne(registerationData: RegisterationData): RegisterationData[] {
    this.users.push(registerationData);
    return this.users;
  }
}
