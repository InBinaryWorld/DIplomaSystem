import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportSystemDataComponent } from "./components/import/import-system-data.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuard } from "../../core/guards/auth.guard";
import { AdminRoleGuard } from "../../core/guards/admin-role.guard";


const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminRoleGuard],
    canActivateChild: [AuthGuard, AdminRoleGuard],
    component: AdminComponent,
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
export class AdminRoutingModule {
}
