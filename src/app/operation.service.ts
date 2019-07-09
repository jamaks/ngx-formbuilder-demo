import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Operations } from './model';
@Injectable()
export class OperationService {

  constructor() { }

  loadOperations(): Operations {
    return plainToClass(Operations, {
      name: 'Hey!',
      operations: [
        {
          id: 1,
          hour: 20,
          description: 'Hey! Its first operation'
        },
        {
          id: 1,
          hour: 4,
          description: 'Hey! Its second operation'
        }
      ]
    });
  }

}
