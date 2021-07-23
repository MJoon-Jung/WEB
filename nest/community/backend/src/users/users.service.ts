import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findOrCreate(email: string) {
    const exUser = await this.usersRepository.findOne({ where: { email } });
    if (exUser) {
      return exUser;
    }
    return await this.usersRepository.save({ email });
  }
}
