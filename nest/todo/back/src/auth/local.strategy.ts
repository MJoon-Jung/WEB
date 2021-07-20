import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LocalService } from './local.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private localService: LocalService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
    console.log('super');
  }

  async validate(email: string, password: string, done: CallableFunction) {
    const user = await this.localService.validateUser(email, password);
    if (!user) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
    return done(null, user);
  }
}
