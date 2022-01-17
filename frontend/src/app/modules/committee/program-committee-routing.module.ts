import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { ProgramCommitteeTopicsComponent } from "./components/topics/program-committee-topics.component";
import { ProgramCommitteeComponent } from "./components/program-committee/program-committee.component";
import {
  ProgramCommitteeTopicReviewComponent
} from "./components/topics/review/program-committee-topic-review.component";


const routes: Routes = [
  {
    path: 'program-committee',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.PROGRAM_COMMITTEE_MEMBER] },
    component: ProgramCommitteeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'topic',
      },
      {
        path: 'topic',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ProgramCommitteeTopicsComponent,
          },
          {
            path: ':id',
            component: ProgramCommitteeTopicReviewComponent,
          }
        ],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramCommitteeRoutingModule {
}
