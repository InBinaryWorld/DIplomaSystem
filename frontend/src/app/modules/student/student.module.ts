import { NgModule } from '@angular/core';

import { StudentRoutingModule } from "./student-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ImportSystemDataComponent } from "./components/import/import-system-data.component";
import { StudentComponent } from "./components/student/student.component";


@NgModule({
  declarations: [
    StudentComponent,
    ImportSystemDataComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
