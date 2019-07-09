import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OperationService } from './operation.service';
import { FormStoreService } from './form-store.service';
import { ValidateFromStoreConstraint } from './validators/async-validators';
import { validateModule } from './validators/validate.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, CommonModule
  ],
  providers: [OperationService, FormStoreService, ValidateFromStoreConstraint],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    validateModule.injector = injector;
  }
 }
