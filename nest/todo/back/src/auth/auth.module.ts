import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/users/users.service';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule, UsersModule],
  providers: [AuthService, UsersService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
