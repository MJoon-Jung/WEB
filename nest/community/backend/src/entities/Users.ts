import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'yju' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @Column('varchar', { name: 'nickname', nullable: true, length: 20 })
  nickname: string | null;

  @Column('varchar', { name: 'password', length: 20 })
  password: string;
}
