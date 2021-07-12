import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterationData } from 'src/dto/register.request.dto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async validateUser(email: string, pass: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      console.log('user info: ', email, user.password, user);
      await this.verifyPassword(pass, user.password);
      const { password, ...withOutPassword } = user;
      return withOutPassword;
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCookieWithJwtToken(user: any) {
    const payload = { userId: user.id, userName: user.name };
    const token = this.jwtService.sign(payload);
    return {
      cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`,
      access_token: token,
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
