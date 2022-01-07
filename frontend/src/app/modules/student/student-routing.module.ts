import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportSystemDataComponent } from "./components/import/import-system-data.component";
import { StudentComponent } from "./components/student/student.component";
import { StudentRoleGuard } from "../../core/guards/student-role.guard";
import { AuthGuard } from "../../core/guards/auth.guard";


const routes: Routes = [
  {
    path: 'student',
    canActivate: [AuthGuard, StudentRoleGuard],
    canActivateChild: [AuthGuard, StudentRoleGuard],
    component: StudentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'import',
      },
      {
        path: 'import',
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
