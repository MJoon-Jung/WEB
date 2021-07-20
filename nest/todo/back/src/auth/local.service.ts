import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterationData } from 'src/dto/register.request.dto';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(pass, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  getCookieForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
  async register(registerationData: RegisterationData): Promise<Users> {
    const exUser = await this.usersRepository.findOne({
      email: registerationData.email,
    });
    if (exUser) {
      throw new HttpException('users email exists', HttpStatus.FORBIDDEN);
    }
    registerationData.password = await bcrypt.hash(
      registerationData.password,
      parseInt(process.env.SALTROUND, 10),
    );
    registerationData.provider = 'local';
    const newUser = await this.usersRepository.save(registerationData);
    return await this.usersRepository.save(newUser);
  }
}
