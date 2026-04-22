import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { email: string; password: string }) {
    console.log(body);
    return await this.userService.create(body.email, body.password);
  }
}
