import { NgModule } from '@angular/core';

import { LecturerRoutingModule } from "./lecturer-routing.module";
import { SharedModule } from "../shared/shared.module";
import { LecturerTopicsComponent } from "./components/topics/lecturer-topics.component";
import { LecturerComponent } from "./components/lecturer/lecturer.component";
import { LecturerTopicReviewComponent } from "./components/topics/review/lecturer-topic-review.component";
import { LecturerTopicManageComponent } from "./components/topics/manage/lecturer-topic-manage.component";
import { LecturerTopicCreateComponent } from "./components/topics/create/lecturer-topic-create.component";
import { LecturerTopicCorrectComponent } from "./components/topics/correct/lecturer-topic-correct.component";
import {
  LecturerReservationsManageComponent
} from "./components/reservations/manage/lecturer-reservations-manage.component";
import { LecturerReservationsComponent } from "./components/reservations/lecturer-reservations.component";


@NgModule({
  declarations: [
    LecturerComponent,
    LecturerTopicsComponent,
    LecturerTopicReviewComponent,
    LecturerTopicManageComponent,
    LecturerTopicCreateComponent,
    LecturerTopicCorrectComponent,
    LecturerReservationsComponent,
    LecturerReservationsManageComponent
  ],
  imports: [
    SharedModule,
    LecturerRoutingModule,
  ]
})
export class LecturerModule {
}
