import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/generated/prisma/client';
import { QueryParamsDto } from './dto/qurey-params.dto';
import * as brcypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findByMail(email: string): Promise<User> {
    const user = await this.userRepository.finByEmail(email);
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  async create(body: CreateUserDto): Promise<User> {
    const { email, password, name, phone } = body;

    const isExisting = await this.userRepository.finByEmail(email);
    if (isExisting) {
      throw new ConflictException('User is existing');
    }
    const hashedPassword = await brcypt.hash(password, 10);
    return await this.userRepository.create(email, hashedPassword, name, phone);
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
    const where = name ? { name: { contains: name } } : {};
    const { items, total } = await this.userRepository.getAll({
      skip,
      take: limit,
      where,
    });
    return { items, limit, total, page, lastPage: Math.ceil(total / limit) };
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User is not founded');
    }
    return new UserResponseDto(user);
  }
}
