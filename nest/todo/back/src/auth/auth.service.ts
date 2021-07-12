import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterationData } from 'src/dto/register.request.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      console.log('user info: ', email, user.password, user);
      await this.verifyPassword(password, user.password);
      return user;
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: any) {
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(registerationData: RegisterationData): Promise<Users> {
    const exUser = await this.usersRepository.findOne({
      name: registerationData.name,
    });
    if (exUser) {
      throw new HttpException('users name exists', HttpStatus.FORBIDDEN);
    }
    registerationData.password = await bcrypt.hash(
      registerationData.password,
      parseInt(process.env.SALTROUND, 10),
    );
    const newUser = await this.usersRepository.create(registerationData);
    return await this.usersRepository.save(newUser);
  }
}
