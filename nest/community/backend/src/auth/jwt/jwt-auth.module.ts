import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtAuthService, JwtAuthStrategy],
  exports: [JwtModule, JwtAuthService],
})
export class JwtAuthModule {}
