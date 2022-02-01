import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';
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
  StudentCreateClarificationRequestComponent
} from './components/topic-clarification/create/student-create-clarification-request.component';
import {
  StudentClarificationRequestDetailsComponent
} from './components/topic-clarification/details/student-clarification-request-details.component';
import {
  StudentChangeRequestDetailsComponent
} from './components/topic-change/details/student-change-request-details.component';
import {
  StudentCreateChangeRequestComponent
} from './components/topic-change/create/student-create-change-request.component';


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
        redirectTo: 'reservations'
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentReservationsComponent
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
            path: 'details/:topicId',
            component: StudentPropositionDetailsComponent
          },
          {
            path: 'create',
            component: StudentCreatePropositionComponent
          }
        ]
      },
      {
        path: 'change-requests',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentChangeRequestsComponent
          },
          {
            path: 'details/:requestId',
            component: StudentChangeRequestDetailsComponent
          },
          {
            path: 'create',
            component: StudentCreateChangeRequestComponent
          }
        ]
      },
      {
        path: 'clarification-requests',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StudentTopicClarificationsComponent
          },
          {
            path: 'details/:requestId',
            component: StudentClarificationRequestDetailsComponent
          },
          {
            path: 'create',
            component: StudentCreateClarificationRequestComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
