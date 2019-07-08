import { IsNotEmpty, ValidateNested, Validate, IsOptional } from 'class-validator';
import { Type, plainToClassFromExist } from 'class-transformer';


export function serializeModel<T>(object: T) {
  return function() {
    return object;
  };
}

import { ObjectMustBeNotEmpty, PropertySum } from './validators/validators';


export class Operation {
  id: number = undefined;
  hour = 0;
  @IsNotEmpty({ always: true })
  description: string = undefined;
  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }
}

export class Operations {

  name: string = undefined;
  @ValidateNested()
  @Validate(ObjectMustBeNotEmpty, [1, 3], {
    message: 'min length = 1 and max length = 3, and must be not empty'
  })
  @Validate(PropertySum, ['hour', (summ) => summ === 24], {
    message: 'hours !== 24'
  })
  @IsOptional()
  @Type(serializeModel(Operation))
  operations?: Operation[] = [];
  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }
}
