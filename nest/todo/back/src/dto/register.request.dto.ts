import { IsString } from 'class-validator';

export class RegisterationData {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
