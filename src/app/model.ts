import { IsNotEmpty, ValidateNested, Validate, IsOptional } from 'class-validator';
import { Type, plainToClassFromExist } from 'class-transformer';


export function serializeModel<T>(object: T) {
  return function () {
    return object;
  };
}

import { ObjectMustBeNotEmpty, PropertySum } from './validators/validators';
import { DictionaryExist, ValidateFromStoreConstraint } from './validators/async-validators';
import { operationMaterialCountValidate } from './validators/validators-model';

export class Material {
  id: string = undefined;

  @IsNotEmpty()
  name: string = undefined;

  @IsNotEmpty()
  type: number = undefined;

  @IsNotEmpty()
  count: number = undefined;

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }
}

export class Operation {
  id: number = undefined;

  @IsNotEmpty()
  hour = 0;

  @IsNotEmpty()
  @DictionaryExist()
  reference: string = undefined;

  @IsNotEmpty()
  description: string = undefined;

  @IsNotEmpty()
  @Validate(ValidateFromStoreConstraint, [operationMaterialCountValidate],{
    message: 'не хватает минералов'
  })
  materialCount: number = undefined;

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }
}

export class Sections {
  @IsNotEmpty()
  name: string = undefined;

  @ValidateNested()
  @IsOptional()
  @Type(serializeModel(Material))
  materials?: Material[] = [];

  @ValidateNested()
  @Validate(PropertySum, ['hour', (sum) => sum === 24], { message: 'hour !== 24' })
  @Validate(ObjectMustBeNotEmpty, [1, 5], {message: 'operations should be > 0 & < 6'})
  @IsOptional()
  @Type(serializeModel(Operation))
  operations?: Operation[] = [];

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }
}
