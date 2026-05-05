import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import type { UserPayload } from 'src/common/interfaces/user-payload.interface';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: UserPayload) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfile(@Param('id') id: number) {
    return await this.authService.getUser(+id);
  }
}
