import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { LecturerTopicsComponent } from "./components/topics/lecturer-topics.component";
import { LecturerComponent } from "./components/lecturer/lecturer.component";


const routes: Routes = [
  {
    path: 'lecturer',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.LECTURER] },
    component: LecturerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'topic',
      },
      {
        path: 'topic',
        component: LecturerTopicsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturerRoutingModule {
}
