import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DynamicFormGroup, DynamicFormBuilder } from 'ngx-dynamic-form-builder';
import { filter } from 'rxjs/operators';
import { Operation, Sections, Material } from './model';
import { FormArray } from '@angular/forms';
import { OperationService } from './operation.service';
import { FormStoreService } from './form-store.service';
import { ValidateFromStoreConstraint } from './validators/async-validators';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  form: DynamicFormGroup<Sections>;
  fb = new DynamicFormBuilder();
  saved;
  constructor(
    @Inject(FormStoreService) private formStore: FormStoreService,
    @Inject(OperationService) private operationService: OperationService) {
    this.form = this.fb.group(Sections, { customValidatorOptions: {} });
    this.form.valueChanges.subscribe(r => {
      this.formStore.form = this.form.object;
    });
    this.form.object = plainToClass(Sections, {name: 'Section form'});
  }
  /**
   * Create fb control
   */
  createOpsControl() {
    return this.fb.group(Operation);
  }
  createMaterialControl() {
    return this.fb.group(Material);
  }

  /**
   * Get form arrays
   */
  getOps() {
    return this.form.get('operations') as FormArray;
  }
  getMaterials() {
    return this.form.get('materials') as FormArray;
  }

  /**
   * Add controls
   */
  addMaterial() {
    this.getMaterials().push(this.createMaterialControl());
  }
  addOps() {
    this.getOps().push(this.createOpsControl());
  }

  /**
   * Actions
   */
  onLoadClick(): void {
    this.addOps(); // fix dynamic form group if undefined
    this.addMaterial();
    this.saved = undefined;
    this.form.object = this.operationService.loadSections();
    this.form.validateAllFormFields();
  }
  onClearClick(): void {
    this.saved = undefined;
    this.form.object = new Sections();
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
