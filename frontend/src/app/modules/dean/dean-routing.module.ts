import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeanComponent } from "./components/dean/dean.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import {
  DeanTopicClarificationRequestsComponent
} from "./components/clarification/dean-topic-clarification-requests.component";


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
        redirectTo: 'clarification',
      },
      {
        path: 'clarification',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DeanTopicClarificationRequestsComponent,
          },
          {
            path: ':id',
            component: DeanTopicClarificationRequestsComponent,
          }
        ]
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
