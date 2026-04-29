import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/generated/prisma/client';
import { QueryParamsDto } from './dto/qurey-params.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    body: CreateUserDto,
  ): Promise<User> {
    console.log(body);
    return await this.userService.create(body);
  }

  @Get()
  async getAll(@Query() params: QueryParamsDto) {
    const result = await this.userService.getAll(params);
    return {
      ...result,
      items: result.items.map((user) => new UserResponseDto(user)),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.userService.findById(+id);
    return user;
  }
}
