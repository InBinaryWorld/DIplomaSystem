import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from "./components/student/student.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { StudentTopicChangeComponent } from "./components/topic-change/student-topic-change.component";


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
        redirectTo: 'topic-change',
      },
      {
        path: 'topic-change',
        component: StudentTopicChangeComponent,
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
