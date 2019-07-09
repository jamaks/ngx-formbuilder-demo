import { IsNotEmpty, ValidateNested, Validate, IsOptional } from 'class-validator';
import { Type, plainToClassFromExist } from 'class-transformer';


export function serializeModel<T>(object: T) {
  return function () {
    return object;
  };
}

import { ObjectMustBeNotEmpty, PropertySum } from './validators/validators';


export class Operation {
  id: number = undefined;

  @IsNotEmpty({ always: true })
  hour = 0;

  @IsNotEmpty({ always: true })
  description: string = undefined;

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }
}

export class Operations {
  @IsNotEmpty({ always: true })
  name: string = undefined;

  @ValidateNested()
  @Validate(PropertySum, ['hour', (sum) => sum === 24], { message: 'hour !== 24' })
  @Validate(ObjectMustBeNotEmpty, [1,5], {message: 'operations should be > 0 & < 6'})
  @IsOptional()
  @Type(serializeModel(Operation))
  operations?: Operation[] = [];

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }
}
