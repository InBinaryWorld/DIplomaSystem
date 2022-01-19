import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from "../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../shared/dto/topic-status.model";
import { ChangeRequest } from "../../../shared/dto/change-request.model";
import { ApplicationState } from "../../../shared/dto/application-state.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-topic-change',
  templateUrl: './section-topic-change.component.html',
  styleUrls: ['./section-topic-change.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTopicChangeComponent {

  topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  application: ChangeRequest = {
    id: '13',
    oldTopic: this.topic,
    newTopic: this.topic,
    submissionDate: new Date(),
    state: ApplicationState.Waiting
  };

  applications: ChangeRequest[] = [
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

  showDetails(application: ChangeRequest): void {
    this.router.navigate(['/diploma-section/topic-change/', application.id])
  }
}