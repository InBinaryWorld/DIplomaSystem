import { NgModule } from '@angular/core';

import { StudentRoutingModule } from "./student-routing.module";
import { SharedModule } from "../shared/shared.module";
import { StudentComponent } from "./components/student/student.component";
import { StudentTopicChangeComponent } from "./components/topic-change/student-topic-change.component";
import {
  StudentTopicClarificationComponent
} from "./components/topic-clarification/student-topic-clarification.component";
import { StudentReservationsComponent } from "./components/reservations/student-reservations.component";
import {
  StudentReservationDetailsComponent
} from "./components/reservations/details/student-reservation-details.component";
import { StudentTopicDetailsComponent } from "./components/reservations/topic/student-topic-details.component";
import {
  StudentCreateReservationComponent
} from "./components/reservations/create/student-create-reservation.component";
import { StudentTopicPropositionsComponent } from "./components/propositions/student-topic-propositions.component";
import {
  StudentCreatePropositionComponent
} from "./components/propositions/create/student-create-proposition.component";
import {
  StudentPropositonDetailsComponent
} from "./components/propositions/details/student-propositon-details.component";

@NgModule({
  declarations: [
    StudentComponent,
    StudentTopicChangeComponent,
    StudentTopicClarificationComponent,
    StudentReservationsComponent,
    StudentTopicDetailsComponent,
    StudentReservationDetailsComponent,
    StudentCreateReservationComponent,
    StudentTopicPropositionsComponent,
    StudentCreatePropositionComponent,
    StudentPropositonDetailsComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule,
  ]
})
export class StudentModule {
}
