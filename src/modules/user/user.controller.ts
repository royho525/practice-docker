import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/generated/prisma/client';
import { QueryParamsDto } from './dto/qurey-params.dto';
import { UserEntity } from './entity/user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() body: { email: string; password: string },
  ): Promise<User> {
    console.log(body);
    return await this.userService.create(body.email, body.password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Query() params: QueryParamsDto) {
    const result = await this.userService.getAll(params);
    return {
      ...result,
      data: result.data.map((user) => new UserEntity(user)),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findById(+id);
    return new UserEntity(user);
  }
}
