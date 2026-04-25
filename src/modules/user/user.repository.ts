import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string): Promise<User> {
    return this.prisma.user.create({ data: { email, password } });
  }

  async getAll(params: { skip: number; take: number; where?: object }) {
    const { skip, take, where } = params;
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        where,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, total };
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
