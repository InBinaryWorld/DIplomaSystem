import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { ProgramCommitteeTopicsComponent } from "./components/topics/program-committee-topics.component";
import { ProgramCommitteeComponent } from "./components/program-committee/program-committee.component";


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
        component: ProgramCommitteeTopicsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramCommitteeRoutingModule {
}
