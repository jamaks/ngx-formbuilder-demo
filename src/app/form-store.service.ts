import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormStoreService {
  private _form: any;
  constructor() { }
  set form(val) {
    this._form = val;
  }
  get form() {
    return this._form;
  }
}
