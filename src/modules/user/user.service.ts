import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/generated/prisma/client';
import { QueryParamsDto } from './dto/qurey-params.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(email: string, password: string): Promise<User> {
    return await this.userRepository.create(email, password);
  }

  async getAll(params: QueryParamsDto) {
    const { page, limit, name } = params;
    if (page < 1) {
      throw new BadRequestException('Số trang phải lớn hơn 0');
    }
    if (limit < 1) {
      throw new BadRequestException('Số lượng phải lớn hơn 0');
    }
    const skip = (page - 1) * limit;
    const where = name ? { email: { contains: name } } : {};
    const { data, total } = await this.userRepository.getAll({
      skip,
      take: limit,
      where,
    });
    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
