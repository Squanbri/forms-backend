import { Form } from 'src/forms/forms.model';
import { User } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Form])
  ],
  exports: [UsersService],
})
export class UsersModule {}
