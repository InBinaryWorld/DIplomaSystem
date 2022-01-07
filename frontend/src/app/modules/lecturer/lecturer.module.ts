import { NgModule } from '@angular/core';

import { LecturerRoutingModule } from "./lecturer-routing.module";
import { SharedModule } from "../shared/shared.module";
import { LecturerTopicsComponent } from "./components/topics/lecturer-topics.component";
import { LecturerComponent } from "./components/lecturer/lecturer.component";


@NgModule({
  declarations: [
    LecturerComponent,
    LecturerTopicsComponent
  ],
  imports: [
    SharedModule,
    LecturerRoutingModule,
  ]
})
export class LecturerModule {
}
