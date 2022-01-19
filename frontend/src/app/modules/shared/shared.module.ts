import { NgModule } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { LocalDatePipe } from "./pipes/local-date.pipe";

@NgModule({
  declarations: [
    SidebarComponent,
    LocalDatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    SidebarComponent,
    LocalDatePipe
  ]
})
export class SharedModule {
}
