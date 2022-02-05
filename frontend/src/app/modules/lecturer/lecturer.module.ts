import { NgModule } from '@angular/core';

import { LecturerRoutingModule } from './lecturer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LecturerTopicsComponent } from './components/topics/lecturer-topics.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerTopicCreateComponent } from './components/topics/create/lecturer-topic-create.component';
import {
  LecturerReservationsManageComponent
} from './components/reservations/manage/lecturer-reservations-manage.component';
import { LecturerReservationsComponent } from './components/reservations/lecturer-reservations.component';


@NgModule({
  declarations: [
    LecturerComponent,
    LecturerTopicsComponent,
    LecturerTopicCreateComponent,
    LecturerReservationsComponent,
    LecturerReservationsManageComponent
  ],
  imports: [
    SharedModule,
    LecturerRoutingModule
  ]
})
export class LecturerModule {
}
