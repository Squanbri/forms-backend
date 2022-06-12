import { FormsService } from './forms.service';
import { Body, Controller, Get, Param, Post, Headers, UseGuards, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { authenticate } from 'passport';

@Controller('api/forms')
export class FormsController {

  constructor(private formService: FormsService) {}

  @Get()
  findAll() {
    return this.formService.findAll();
  }

  @Get(':id')
  findOne(
    @Param() params: { id: string}, 
    @Headers('authorization') authorization: string
  ) {
    return this.formService.findOne(params.id, authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createForm(
    @Body() formContent,
    @Headers('authorization') authorization: string
  ) {
    return this.formService.createForm(formContent, authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateForm(
    @Body() form,
    @Headers('authorization') authorization: string
  ) {
    return this.formService.updateForm(form, authorization);
  }
}
