import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

  
    if (errors.length) {
      const messages = {
        statusCode: 400,
        errors: {}
      };

      errors.forEach(error => {
        const constraints = Object.values(error.constraints);
        
        constraints.forEach(constraint => {
          const isMessageByPropertyIsArray = Array.isArray(messages.errors[error.property]);
          
          if (isMessageByPropertyIsArray) {
            messages.errors[error.property] = constraint[0];
          } else {
            messages.errors[error.property] = constraint
          }
        })
      })
      
      throw new ValidationException(messages);
    }

    return value;
  }
}