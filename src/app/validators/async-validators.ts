import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';

import { of } from 'rxjs';
import { Injectable, Inject, Injector } from '@angular/core';
import { FormStoreService } from '../form-store.service';
import { validateModule } from './validate.module';

const dictionary = ['hey', 'shit'];

@ValidatorConstraint({ async: true })
export class DictionaryExistConstraint implements ValidatorConstraintInterface {

    validate(entity: any, args: ValidationArguments) {
      if (!entity) { return true; }
      return of(dictionary).toPromise().then(data => {
            return data.includes(entity);
        });
    }
    defaultMessage() {
      return '$value not in dictionary';
    }

}

export function DictionaryExist(validationOptions?: ValidationOptions) {
   return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: DictionaryExistConstraint
        });
   };
}


@ValidatorConstraint()
export class ValidateFromStoreConstraint implements ValidatorConstraintInterface {
  private injector: Injector;
  private formStore: FormStoreService;
  constructor() {
    this.injector = validateModule.injector;
    this.formStore = this.injector.get(FormStoreService);
  }
  validate(data: Object | ArrayLike<Object>, valArgs: ValidationArguments) {
    this.formStore = this.injector.get(FormStoreService);
    if (valArgs.constraints.length !== 1) {
      throw new Error('Should be 1 arguments in ValidateFromStoreConstraint');
    }

    const [func] = valArgs.constraints;

    if (typeof func !== 'function') {
      throw new Error('Should be function arguments in ValidateFromStoreConstraint');
    }

    return func(data, this.formStore.form);
  }
}

// export function ValidateFromStore(validationOptions?: ValidationOptions) {
//   return function(object: Object, propertyName: string) {
//        registerDecorator({
//            target: object.constructor,
//            propertyName,
//            options: validationOptions,
//            constraints: [],
//            validator: ValidateFromStoreConstraint
//        });
//   };
// }
