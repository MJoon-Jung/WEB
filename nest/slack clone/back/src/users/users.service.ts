import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository, Transaction, TransactionRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor() {} // private channelMembersRepository: Repository<ChannelMembers>, // @InjectRepository(ChannelMembers) // private workspaceMembersRepository: Repository<WorkspaceMembers>, // @InjectRepository(WorkspaceMembers) // @InjectRepository(Users) private usersRepository: Repository<Users>,
  getUsers() {}

  @Transaction()
  async join(
    @TransactionRepository(Users) usersRepository: Repository<Users>,
    @TransactionRepository(WorkspaceMembers)
    workspaceMembersRepository: Repository<WorkspaceMembers>,
    @TransactionRepository(ChannelMembers)
    channelMembersRepository: Repository<ChannelMembers>,
    email: string,
    nickname: string,
    password: string,
  ) {
    const user = await usersRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const returned = await usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });

    await workspaceMembersRepository.save({
      UserId: returned.id,
      WorkspaceId: 1,
    });

    await channelMembersRepository.save({
      UserId: returned.id,
      ChannelId: 1,
    });
  }
}
