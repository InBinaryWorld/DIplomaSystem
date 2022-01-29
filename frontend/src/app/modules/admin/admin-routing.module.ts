import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportSystemDataComponent } from './components/import/import-system-data.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';


const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.ADMIN] },
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'import'
      },
      {
        path: 'import',
        component: ImportSystemDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
