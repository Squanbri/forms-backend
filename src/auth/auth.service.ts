import { ConfirmUserDto } from './../users/dto/confirm-user.dto';
import { ReadUserDto } from './../users/dto/read-user.dto';
import { RegisterUserDto } from './../users/dto/register-user.dto';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/users/users.model';

interface JwtPayload {
  email: string;
  sub: number;
}

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, password: string): Promise<User>  {
    const user = await this.usersService.getUserByEmail(email);
    
    if (user?.password === password) {
      return user;
    }

    return null;
  }

  async registration(userDto: RegisterUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (user) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
    }

    const token = Date.now() + Math.floor(1000 + Math.random() * 9000).toString();
    userDto.confirmToken = token;

    await this.usersService.registerUser(userDto)
    await this.mailService.sendUserConfirmation(userDto);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async confirmRegister(confirmDto: ConfirmUserDto) {
    const user = await this.usersService.getUserByEmail(confirmDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.confirmToken !== confirmDto.token || user.isConfirmRegister === true) {
      throw new UnauthorizedException();
    }
    
    user.isConfirmRegister = true;
    user.save();

    return this.login({
      email: user.email,
      password: user.password
    })
  }

  async getUserByAuthToken(token: string) {
    const decoded = this.jwtService.decode(token) as JwtPayload;

    const user = await this.usersService.getUserById(decoded.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.login({
      email: user.email,
      password: user.password
    })
  }
}
