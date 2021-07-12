import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
