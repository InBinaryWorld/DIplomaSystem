import { NgModule } from '@angular/core';

import { DiplomaSectionRoutingModule } from './diploma-section-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DiplomaSectionComponent } from './components/diploma-section/diploma-section.component';
import { TimetablesComponent } from './components/timetable/timetables.component';
import { EditTimetableComponent } from './components/timetable/edit/edit-timetable.component';
import { CreateTimetableComponent } from './components/timetable/create/create-timetable.component';
import { ShowTimetableComponent } from './components/timetable/show/show-timetable.component';


@NgModule({
  declarations: [
    DiplomaSectionComponent,
    TimetablesComponent,
    EditTimetableComponent,
    CreateTimetableComponent,
    ShowTimetableComponent
  ],
  imports: [
    SharedModule,
    DiplomaSectionRoutingModule
  ]
})
export class DiplomaSectionModule {
}
