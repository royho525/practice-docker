import { Exclude } from 'class-transformer';

export class UserEntity {
  id!: number;
  email!: string;

  @Exclude()
  password!: string;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
