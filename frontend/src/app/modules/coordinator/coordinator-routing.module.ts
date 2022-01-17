import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorTopicsComponent } from "./components/topics/coordinator-topics.component";
import { CoordinatorComponent } from "./components/coordinator/coordinator.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { CoordinatorTopicReviewComponent } from "./components/topics/review/coordinator-topic-review.component";


const routes: Routes = [
  {
    path: 'coordinator',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.COORDINATOR] },
    component: CoordinatorComponent,
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
            component: CoordinatorTopicsComponent,
          },
          {
            path: ':id',
            pathMatch: 'full',
            component: CoordinatorTopicReviewComponent,
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
export class CoordinatorRoutingModule {
}
