import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../core/guards/auth.guard";
import { RoleGuard } from "../../core/guards/role.guard";
import { Role } from "../../core/models/role.model";
import { DiplomaSectionComponent } from "./components/diploma-section/diploma-section.component";
import { TimetablesComponent } from "./components/timetable/timetables.component";
import { SectionTopicChangeComponent } from "./components/topic-changes/section-topic-change.component";
import { EditTimetableComponent } from "./components/timetable/edit/edit-timetable.component";
import { CreateTimetableComponent } from "./components/timetable/create/create-timetable.component";
import { ShowTimetableComponent } from "./components/timetable/show/show-timetable.component";
import {
  SectionTopicChangeDetailsComponent
} from "./components/topic-changes/details/section-topic-change-details.component";


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
      },
      {
        path: 'topic-change',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: SectionTopicChangeComponent
          },
          {
            path: ':id',
            pathMatch: 'full',
            component: SectionTopicChangeDetailsComponent
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
export class DiplomaSectionRoutingModule {
}
