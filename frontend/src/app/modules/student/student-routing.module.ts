import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportSystemDataComponent } from "./components/import/import-system-data.component";
import { StudentComponent } from "./components/student/student.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";


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
        redirectTo: 'change',
      },
      {
        path: 'change',
        component: ImportSystemDataComponent,
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