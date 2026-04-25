import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRequestDto } from './dto/auth-request.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  authenticate(req: AuthRequestDto): string {
    console.log('Authenticating user with email:', req);
    return 'Hello World';
  }

  async validateUser(email: string, password: string): Promise<any> {
    return null;
  }
}
