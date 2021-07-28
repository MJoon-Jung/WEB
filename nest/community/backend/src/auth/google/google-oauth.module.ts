import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';

@Module({
  imports: [UsersModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
