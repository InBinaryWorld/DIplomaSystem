import { NgModule } from '@angular/core';

import { DeanRoutingModule } from "./dean-routing.module";
import { SharedModule } from "../shared/shared.module";
import { TopicChangeRequestsComponent } from "./components/topic-change/topic-change-requests.component";
import { DeanComponent } from "./components/dean/dean.component";


@NgModule({
  declarations: [
    DeanComponent,
    TopicChangeRequestsComponent
  ],
  imports: [
    SharedModule,
    DeanRoutingModule,
  ]
})
export class DeanModule {
}
