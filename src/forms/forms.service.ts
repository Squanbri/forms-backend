import { CreateFormDto } from './dto/create-form.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Form } from './forms.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/auth.service';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormsService {

  constructor(
    @InjectModel(Form) private formRepository,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    const forms = await this.formRepository.findAll();
    return forms;
  }

  async findOne(id: string, authorization: string) {
    try {
      const form = await this.formRepository.findOne({where: {id}})
      const creatorId = form.userId;
      form.userId = false;
      
      if (authorization !== undefined) {
        const token = authorization.split(' ')[1];
        const decoded = this.jwtService.decode(token) as JwtPayload;

        if (decoded?.sub === creatorId) {
          form.userId = true;
        }
      }
      
      return form ?? [];
    } catch (e) {
      return [];
    }
  }

  async createForm(content: object, authorization: string) {
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token) as JwtPayload;
    const createDto = {
      content,
      userId: decoded.sub
    }
    console.log(createDto)

    const form = await this.formRepository.create(createDto);
    return form;
  }

  async updateForm(form: UpdateFormDto, authorization: string) {
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token) as JwtPayload;
    
    const updatedForm = await this.formRepository.findOne({ where: { id: form.formId } });

    if (updatedForm.userId !== decoded.sub) {
      throw new UnauthorizedException();
    }

    updatedForm.content = form.content;
    updatedForm.save();

    return updatedForm;
  }
}
