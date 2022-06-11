import { Controller, Post, UseGuards, Body, Put, Headers, Get } from '@nestjs/common';
import { ConfirmUserDto } from 'src/users/dto/confirm-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('/me') 
  async me(@Headers() headers) {
    const token = headers?.authorization?.split(' ')?.[1];
    return this.authService.getUserByAuthToken(token);
  }
}
