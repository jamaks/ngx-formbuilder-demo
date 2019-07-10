import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Sections } from './model';

const getOperations = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(
      {
        id: i,
        hour: 20,
        reference: 'hey',
        materialCount: 1,
        description: 'Hey! Its first operation'
      }
    )
  }
  return arr;
}

const ops = getOperations();
console.log(ops);

@Injectable()
export class OperationService {

  constructor() { }

  loadSections(): Sections {
    return plainToClass(Sections, {
      name: 'Hey!',
      materials: [
        {
          name: 'Abcd',
          type: 1,
          count: 3
        }
      ],
      operations: ops
      // operations: [
      //   {
      //     id: 1,
      //     hour: 20,
      //     reference: 'hey',
      //     materialCount: 1,
      //     description: 'Hey! Its first operation'
      //   },
      //   {
      //     id: 1,
      //     hour: 4,
      //     reference: 'heyy',
      //     materialCount: 1,
      //     description: 'Hey! Its second operation'
      //   }
      // ]
    });
  }

}
