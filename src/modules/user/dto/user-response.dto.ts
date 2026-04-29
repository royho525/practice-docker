import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id!: number;
  email!: string;
  name!: string;
  phone?: string;
  createAt!: Date;
  upadateAt!: Date;

  @Exclude()
  password!: string;
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
