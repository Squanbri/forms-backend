import { Form } from './forms.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { User } from 'src/users/users.model';

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports: [
    SequelizeModule.forFeature([Form, User])
  ],
})
export class FormsModule {}
