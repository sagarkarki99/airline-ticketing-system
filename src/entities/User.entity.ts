import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}

export enum UserRole {
  admin = 'admin',
  normal = 'normal',
}
