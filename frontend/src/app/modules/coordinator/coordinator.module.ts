import { NgModule } from '@angular/core';

import { CoordinatorRoutingModule } from "./coordinator-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CoordinatorTopicsComponent } from "./components/topics/coordinator-topics.component";
import { CoordinatorComponent } from "./components/coordinator/coordinator.component";
import { CoordinatorTopicReviewComponent } from "./components/topics/review/coordinator-topic-review.component";


@NgModule({
  declarations: [
    CoordinatorComponent,
    CoordinatorTopicsComponent,
    CoordinatorTopicReviewComponent
  ],
  imports: [
    SharedModule,
    CoordinatorRoutingModule,
  ]
})
export class CoordinatorModule {
}
