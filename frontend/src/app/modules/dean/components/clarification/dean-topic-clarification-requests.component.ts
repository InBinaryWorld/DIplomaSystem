import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from "../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../shared/dto/topic-status.model";
import { ApplicationState } from "../../../shared/dto/application-state.model";
import { Router } from "@angular/router";
import { ClarificationRequest } from "../../../shared/dto/clarification-request.model";

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './dean-topic-clarification-requests.component.html',
  styleUrls: ['./dean-topic-clarification-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeanTopicClarificationRequestsComponent {

  topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    personCount: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    fillingDate: new Date()
  };

  application: ClarificationRequest = {
    id: '13',
    submissionDate: new Date(),
    state: ApplicationState.Waiting,
    topic: this.topic,
    newDescription: "lorem ipsum dior",
    newName: "lorem ipsum dior",
  };

  applications: ClarificationRequest[] = [
    this.application,
    this.application,
    this.application,
    this.application,
    this.application,
    this.application,
    this.application,
  ]

  constructor(private readonly router: Router) {
  }

  showDetails(application: ClarificationRequest): void {
    this.router.navigate(['/dean/clarification/', application.id])
  }
}
