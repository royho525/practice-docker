import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string) {
    return this.prisma.user.create({ data: { email, password } });
  }
}
