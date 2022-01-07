import { NgModule } from '@angular/core';

import { DiplomaSectionRoutingModule } from "./diploma-section-routing.module";
import { SharedModule } from "../shared/shared.module";
import { DiplomaSectionComponent } from "./components/diploma-section/diploma-section.component";
import { TimetableComponent } from "./components/timetable/timetable.component";


@NgModule({
  declarations: [
    DiplomaSectionComponent,
    TimetableComponent
  ],
  imports: [
    SharedModule,
    DiplomaSectionRoutingModule,
  ]
})
export class DiplomaSectionModule {
}
