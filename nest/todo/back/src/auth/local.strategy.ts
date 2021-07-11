import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
    console.log('super');
  }

  async validate(name: string, password: string): Promise<any> {
    console.log('validate');
    const user = await this.authService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('validate success');
    return user;
  }
}
