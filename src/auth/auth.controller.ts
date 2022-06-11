import { Controller, Post, UseGuards, Body, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ConfirmUserDto } from 'src/users/dto/confirm-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/register')
  async register(@Body() userDto: RegisterUserDto) {
    return this.authService.registration(userDto);
  }

  @Put('/confirmRegister')
  async confirmRegister(@Body() confirmDto: ConfirmUserDto) {
    return this.authService.confirmRegister(confirmDto);
  }
}
