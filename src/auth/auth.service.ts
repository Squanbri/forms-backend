import { CreateUserDto } from './../users/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any>  {
    const user = await this.usersService.getUserByEmail(email);

    if (user?.password === password) {
      return {
        id: user.id,
        email: user.email,
        password: user.password
      };
    }

    return null;
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (user) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
    }
  }

  async login(userDto: CreateUserDto & { id: number }) {
    const payload = { email: userDto.email, sub: userDto.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
