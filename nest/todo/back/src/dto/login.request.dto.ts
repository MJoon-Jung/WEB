import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
