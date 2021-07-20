import { IsEnum, IsString } from 'class-validator';

export class RegisterationData {
  @IsString()
  email: string;

  @IsString()
  name?: string;

  @IsString()
  password?: string;

  @IsEnum({
    name: 'provider',
    enum: ['github', 'local'],
  })
  provider!: 'github' | 'local';
}
