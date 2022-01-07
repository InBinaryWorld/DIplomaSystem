import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicChangeRequestsComponent } from "./components/topic-change/topic-change-requests.component";
import { DeanComponent } from "./components/dean/dean.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";


const routes: Routes = [
  {
    path: 'dean',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.DEAN] },
    component: DeanComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'topic-change',
      },
      {
        path: 'topic-change',
        component: TopicChangeRequestsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeanRoutingModule {
}
