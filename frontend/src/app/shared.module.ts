import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
