import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from "./components/student/student.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
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


const routes: Routes = [
  {
    path: 'student',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.STUDENT] },
    component: StudentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reservations',
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentReservationsComponent,
          },
          {
            path: 'details/:id',
            component: StudentReservationDetailsComponent
          },
          {
            path: 'topic/:id',
            component: StudentTopicDetailsComponent
          },
          {
            path: 'create/:id',
            component: StudentCreateReservationComponent
          }
        ]
      },
      {
        path: 'topic-propositions',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentTopicPropositionsComponent
          },
          {
            path: 'details/:id',
            component: StudentPropositonDetailsComponent
          },
          {
            path: 'create',
            component: StudentCreatePropositionComponent
          }
        ]
      },
      {
        path: 'topic-change',
        component: StudentTopicChangeComponent,
      },
      {
        path: 'clarification-request',
        component: StudentTopicClarificationComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
