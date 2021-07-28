import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { JoinRequestDto } from './dto/join.request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findOrCreate(joingRequestUser: JoinRequestDto): Promise<Users> {
    const exUser = await this.usersRepository.findOne({
      where: { userId: joingRequestUser.userId },
    });
    if (exUser) {
      return exUser;
    }
    return await this.usersRepository.save({
      userId: joingRequestUser.userId,
      userEmail: joingRequestUser.userEmail,
    });
  }
}
