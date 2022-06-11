import { Form } from 'src/forms/forms.model';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'users'})
export class User extends Model<User, RegisterUserDto> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @Column({type: DataType.STRING, allowNull: false})
  confirmToken: string;

  @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: false})
  isConfirmRegister: boolean;

  @HasMany(() => Form)
  forms: Form[]
}