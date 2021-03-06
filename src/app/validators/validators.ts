import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint()
export class TextLengthMore15 implements ValidatorConstraintInterface {
  validate(text: string) {
    return text ? text.length > 15 : false;
  }
}
@ValidatorConstraint()
export class ObjectMustBeNotEmpty implements ValidatorConstraintInterface {
  validate(data: Object | ArrayLike<Object>, validationArguments: ValidationArguments) {
    let objects;
    if (!Array.isArray(data)) {
      objects = [data];
    } else {
      objects = data;
    }
    const objectLength = objects ? objects.length : 0;
    if (
      !validationArguments.constraints ||
      (validationArguments.constraints &&
        validationArguments.constraints.length === 2 &&
        +validationArguments.constraints[0] <= objectLength &&
        +validationArguments.constraints[1] >= objectLength) ||
      (validationArguments.constraints &&
        validationArguments.constraints.length === 1 &&
        +validationArguments.constraints[0] <= objectLength)
    ) {
      return (
        objectLength !== 0 &&
        objects.filter(object => {
          const keys = object ? Object.keys(object) : [];
          return (
            keys.length === 0 ||
            keys.filter(key => object[key] === undefined || object[key] === null || object[key] === '').length ===
              keys.length
          );
        }).length === 0
      );
    }
    return false;
  }
}

@ValidatorConstraint()
export class PropertySum implements ValidatorConstraintInterface {
  validate(data: Object | ArrayLike<Object>, valArgs: ValidationArguments) {
    if (valArgs.constraints.length !== 2) {
      throw new Error('Should be 2 arguments in PropertySum');
    }

    const [prop, func] = valArgs.constraints;

    if (typeof func !== 'function') {
      throw new Error('Second argument should be function');
    }

    if (Array.isArray(data)) {
      if (data.length === 1) {
        return func(data[0][prop]);
      } else {
        return func(data.reduce((a, c) => a += c[prop], 0));
      }
    }
    return false;
  }
}
