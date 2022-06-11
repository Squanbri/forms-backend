import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: RegisterUserDto) {
    try {
      const url = `${process.env.FRONTEND_URL}/confirmEmail?email=${user.email}&token=${user.confirmToken}`;

      await this.mailerService.sendMail({
        to: 'Squanbri@gmail.com',
        from: 'smartforms.squanbri@yandex.ru',
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'confirmation',
        context: { 
          name: user.email,
          url,
        },
      });
    } catch(e) {
      console.log(e)
    }
  }
}
