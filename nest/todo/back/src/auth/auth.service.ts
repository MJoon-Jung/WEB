import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async validateUser(name: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { name } });
    console.log(name, password, user);
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
