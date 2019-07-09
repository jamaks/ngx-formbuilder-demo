import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DynamicFormGroup, DynamicFormBuilder } from 'ngx-dynamic-form-builder';
import { Operation, Operations } from './model';
import { FormArray } from '@angular/forms';
import { OperationService } from './operation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  form: DynamicFormGroup<Operations>;
  fb = new DynamicFormBuilder();
  saved;
  constructor(@Inject(OperationService) private operationService: OperationService) {
    this.form = this.fb.group(Operations, { customValidatorOptions: {} });
    this.form.valueChanges.subscribe(r => {
      console.log(r);
    });
    this.form.object = new Operations();
  }
  createOpsControl() {
    return this.fb.group(Operation);
  }
  getOps() {
    return this.form.get('operations') as FormArray;
  }
  addOps() {
    this.getOps().push(this.createOpsControl());
  }
  onLoadClick(): void {
    this.addOps(); // fix dynamic form group if undefined
    this.saved = undefined;
    this.form.object = this.operationService.loadOperations();
    this.form.validateAllFormFields();
  }
  onClearClick(): void {
    this.saved = undefined;
    this.form.object = new Operations();
    this.form.validateAllFormFields();
  }
  onSaveClick(): void {
    this.saved = undefined;
    if (this.form.valid) {
      this.saved = this.form.object;
    } else {
      this.form.validateAllFormFields();
    }
  }
}
