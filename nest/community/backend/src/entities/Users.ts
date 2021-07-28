import { Column, Entity } from 'typeorm';

@Entity('users', { schema: 'yju' })
export class Users {
  @Column('varchar', { primary: true, name: 'user_id', length: 100 })
  userId: string;

  @Column('varchar', { name: 'user_email', length: 50 })
  userEmail: string;

  @Column('varchar', { name: 'user_nickname', nullable: true, length: 20 })
  userNickname: string | null;

  @Column('int', { name: 'user_majored', nullable: true })
  userMajored: number | null;

  @Column('text', { name: 'user_image', nullable: true })
  userImage: string | null;
}
