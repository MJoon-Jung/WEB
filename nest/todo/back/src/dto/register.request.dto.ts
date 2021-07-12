import { IsString, IsInt } from 'class-validator';

export class RegisterationData {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsInt()
  password: string;
}
