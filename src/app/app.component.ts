import { Component } from '@angular/core';
import { DynamicFormGroup, DynamicFormBuilder } from 'ngx-dynamic-form-builder';
import { Operation, Operations } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form: DynamicFormGroup<Operations>;
  fb = new DynamicFormBuilder();

  constructor() {
    this.form = this.fb.group(Operations, {customValidatorOptions: {}});
    this.form.valueChanges.subscribe(r => {
      console.log(r);
    });
  }
  addOps() {
    this.form.controls.operations['controls'].push(this.fb.group(Operation));
  }
  onLoadClick(): void {
    this.form.validateAllFormFields();
  }
  onClearClick(): void {
    this.form.validateAllFormFields();
  }
  onSaveClick(): void {
    if (this.form.valid) {
    } else {
      this.form.validateAllFormFields();
    }
  }
}
