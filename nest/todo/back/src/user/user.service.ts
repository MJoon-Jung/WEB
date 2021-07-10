import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getOneByName(name: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        name: name,
      });
      if (!user) {
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const exUser = await this.usersRepository.findOne({
      name: user.name,
    });
    if (exUser) {
      console.log('이미 존재');
      return exUser;
    }
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async updatePassword(user: CreateUserDto): Promise<User> {
    const exUser = await this.getOneByName(user.name);
    exUser.password = user.password;
    return this.usersRepository.save(exUser);
  }

  async deleteUser(id: number): Promise<User> {
    const exUser = await this.getOneById(id);
    return await this.usersRepository.remove(exUser);
  }
}
