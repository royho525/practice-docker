import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(data);
    return new UserResponseDto(user);
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.findByMail(email);
    const password = await bcrypt.compare(pass, user.password);
    if (!password) {
      throw new UnauthorizedException('Password is wrong');
    }
    return new UserResponseDto(user);
  }

  login(user: { email: string; id: number }) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async getUser(id: number): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Can not get user');
    }
    return new UserResponseDto(user);
  }
}
