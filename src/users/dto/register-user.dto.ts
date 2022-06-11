import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  @IsEmail({}, { message: 'Введён некорректный email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(8, { message: 'Пароль должен быть длинее 8 символов' })
  readonly password: string;

  @IsNotEmpty({ message: 'Подтверждение пароля не может быть пустым' })
  @Match('password', { message: 'Пароли не совпадают' })
  readonly confirmPassword: string;
  
  confirmToken?: string;
}