import { NgModule } from '@angular/core';

import { StudentRoutingModule } from "./student-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StudentComponent } from "./components/student/student.component";
import { StudentTopicChangeComponent } from "./components/topic-change/student-topic-change.component";


@NgModule({
  declarations: [
    StudentComponent,
    StudentTopicChangeComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
