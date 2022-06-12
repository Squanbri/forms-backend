import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { CreateFormDto } from './dto/create-form.dto';

@Table({tableName: 'forms'})
export class Form extends Model<Form, CreateFormDto> {
  @Column({ 
    type: DataType.UUID, 
    defaultValue: DataType.UUIDV4, 
    unique: true, 
    primaryKey: true
  })
  id: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  content: object;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}