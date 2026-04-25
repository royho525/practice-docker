import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthRequestDto } from './dto/auth-request.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body(new ValidationPipe()) req: AuthRequestDto): unknown {
    try {
      return this.authService.authenticate(req);
    } catch (error) {
      console.error('Error in AuthController.login:', error);
    }
  }
}
