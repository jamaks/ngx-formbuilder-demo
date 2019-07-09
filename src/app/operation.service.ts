import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Sections } from './model';
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
      operations: [
        {
          id: 1,
          hour: 20,
          reference: 'hey',
          description: 'Hey! Its first operation'
        },
        {
          id: 1,
          hour: 4,
          reference: 'heyy',
          description: 'Hey! Its second operation'
        }
      ]
    });
  }

}
