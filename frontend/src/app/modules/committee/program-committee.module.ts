import { NgModule } from '@angular/core';

import { ProgramCommitteeRoutingModule } from './program-committee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProgramCommitteeTopicsComponent } from './components/topics/program-committee-topics.component';
import { ProgramCommitteeComponent } from './components/program-committee/program-committee.component';
import {
  ProgramCommitteeTopicChangeComponent
} from './components/topic-changes/program-committee-topic-change.component';
import {
  ProgramCommitteeTopicChangeDetailsComponent
} from './components/topic-changes/details/program-committee-topic-change-details.component';


@NgModule({
  declarations: [
    ProgramCommitteeComponent,
    ProgramCommitteeTopicsComponent,
    ProgramCommitteeTopicChangeComponent,
    ProgramCommitteeTopicChangeDetailsComponent
  ],
  imports: [
    SharedModule,
    ProgramCommitteeRoutingModule
  ]
})
export class ProgramCommitteeModule {
}
