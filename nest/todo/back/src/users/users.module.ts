import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import config from '../../ormconfig';
import { Users } from './users.entity';
@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
