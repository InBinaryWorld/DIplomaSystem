import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { Role } from '../../base/models/dto/role.model';
import { DiplomaSectionComponent } from './components/diploma-section/diploma-section.component';
import { TimetablesComponent } from './components/timetable/timetables.component';
import { EditTimetableComponent } from './components/timetable/edit/edit-timetable.component';
import { CreateTimetableComponent } from './components/timetable/create/create-timetable.component';
import { ShowTimetableComponent } from './components/timetable/show/show-timetable.component';


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
        redirectTo: 'timetable'
      },
      {
        path: 'timetable',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: TimetablesComponent
          },
          {
            path: 'edit/:id',
            component: EditTimetableComponent
          },
          {
            path: 'show/:id',
            component: ShowTimetableComponent
          },
          {
            path: 'create',
            component: CreateTimetableComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiplomaSectionRoutingModule {
}
