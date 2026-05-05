import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserResponseDto } from 'src/modules/user/dto/user-response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(
    email: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}
