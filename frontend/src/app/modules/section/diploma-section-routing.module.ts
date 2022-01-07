import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { DiplomaSectionComponent } from "./components/diploma-section/diploma-section.component";
import { TimetableComponent } from "./components/timetable/timetable.component";


const routes: Routes = [
  {
    path: 'diploma-section',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { allowedRoles: [Role.DIPLOMA_SECTION_MEMBER] },
    component: DiplomaSectionComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'timetable',
      },
      {
        path: 'timetable',
        component: TimetableComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiplomaSectionRoutingModule {
}
