import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(email: string, password: string) {
    return await this.userRepository.create(email, password);
  }
}
