import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password?: string;

  @Column({
    type: 'enum',
    name: 'provider',
    enum: ['github', 'local'],
  })
  provider!: 'github' | 'local';
}
