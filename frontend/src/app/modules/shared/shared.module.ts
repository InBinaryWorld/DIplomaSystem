import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { ValidationFeedbackComponent } from './components/validation-feedback/validation-feedback.component';
import { ErrorAlertComponent } from './components/alerts/error/error-alert.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ErrorAlertComponent,
    ValidationFeedbackComponent,
    LocalDatePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    ErrorAlertComponent,
    ValidationFeedbackComponent,
    LocalDatePipe
  ]
})
export class SharedModule {
}
