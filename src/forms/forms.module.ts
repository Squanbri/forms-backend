import { Form } from './forms.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { User } from 'src/users/users.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    SequelizeModule.forFeature([Form, User])
  ],
})
export class FormsModule {}
