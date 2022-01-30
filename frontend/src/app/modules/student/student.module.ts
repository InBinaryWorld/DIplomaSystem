import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './components/student/student.component';
import { StudentTopicChangesComponent } from './components/topic-change/student-topic-changes.component';
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
  StudentTopicClarificationDetailsComponent
} from './components/topic-clarification/details/student-topic-clarification-details.component';
import {
  StudentTopicCreateClarificationComponent
} from './components/topic-clarification/create/student-topic-create-clarification.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentTopicChangesComponent,
    StudentReservationsComponent,
    StudentTopicDetailsComponent,
    StudentReservationDetailsComponent,
    StudentCreateReservationComponent,
    StudentTopicPropositionsComponent,
    StudentCreatePropositionComponent,
    StudentPropositionDetailsComponent,
    StudentTopicClarificationsComponent,
    StudentTopicCreateClarificationComponent,
    StudentTopicClarificationDetailsComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
