import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { RegisterationData } from 'src/dto/register.request.dto';
dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async getById(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async findOneUser(registerationData: RegisterationData): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        email: registerationData.email,
        provider: registerationData.provider,
      },
    });
    if (user) {
      return user;
    }
    return null;
  }
  async findOrCreate(registerationData: RegisterationData) {
    const user = await this.findOneUser(registerationData);
    if (user) {
      throw new HttpException('The user already exists.', HttpStatus.FORBIDDEN);
    }
    this.usersRepository.save(registerationData);
  }
}
