import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from './users.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginRequestDto } from 'src/dto/login.request.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async createUser(user: LoginRequestDto): Promise<Users> {
    const exUser = await this.usersRepository.findOne({
      name: user.name,
    });
    if (exUser) {
      throw new HttpException('users name exists', HttpStatus.FORBIDDEN);
    }
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.SALTROUND, 10),
    );
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }
  async findUser(name: string): Promise<Users> {
    try {
      console.log('findOne');
      const users = await this.usersRepository.findOne({ name: name });
      if (!users) {
        throw new HttpException('users not exists', HttpStatus.NOT_FOUND);
      }
      return users;
    } catch (err) {
      throw err;
    }
  }

  getAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async getOneById(id: number): Promise<Users> {
    try {
      const users = await this.usersRepository.findOneOrFail(id);
      return users;
    } catch (err) {
      throw err;
    }
  }
  async updatePassword(users: CreateUserDto): Promise<Users> {
    const exUsers = await this.findUser(users.name);
    exUsers.password = users.password;
    return this.usersRepository.save(exUsers);
  }

  async deleteUser(id: number): Promise<Users> {
    const exUsers = await this.getOneById(id);
    return await this.usersRepository.remove(exUsers);
  }
}
