import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './components/student/student.component';
import { StudentChangeRequestsComponent } from './components/topic-change/student-change-requests.component';
import {
  StudentTopicClarificationsComponent
} from './components/topic-clarification/student-topic-clarifications.component';
import { StudentReservationsComponent } from './components/reservations/student-reservations.component';
import {
  StudentReservationDetailsComponent
} from './components/reservations/details/student-reservation-details.component';
import { StudentTopicDetailsComponent } from './components/reservations/topic/student-topic-details.component';
import {
  StudentCreateReservationComponent
} from './components/reservations/create/student-create-reservation.component';
import { StudentTopicPropositionsComponent } from './components/propositions/student-topic-propositions.component';
import {
  StudentCreatePropositionComponent
} from './components/propositions/create/student-create-proposition.component';
import {
  StudentPropositionDetailsComponent
} from './components/propositions/details/student-proposition-details.component';
import {
  StudentClarificationRequestDetailsComponent
} from './components/topic-clarification/details/student-clarification-request-details.component';
import {
  StudentCreateClarificationRequestComponent
} from './components/topic-clarification/create/student-create-clarification-request.component';
import {
  StudentChangeRequestDetailsComponent
} from './components/topic-change/details/student-change-request-details.component';
import {
  StudentCreateChangeRequestComponent
} from './components/topic-change/create/student-create-change-request.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentChangeRequestsComponent,
    StudentReservationsComponent,
    StudentTopicDetailsComponent,
    StudentReservationDetailsComponent,
    StudentCreateReservationComponent,
    StudentTopicPropositionsComponent,
    StudentCreatePropositionComponent,
    StudentPropositionDetailsComponent,
    StudentTopicClarificationsComponent,
    StudentCreateChangeRequestComponent,
    StudentChangeRequestDetailsComponent,
    StudentCreateClarificationRequestComponent,
    StudentClarificationRequestDetailsComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
