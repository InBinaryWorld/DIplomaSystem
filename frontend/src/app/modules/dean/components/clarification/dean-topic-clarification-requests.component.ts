import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from '../../../../base/models/dto/thesis-topic.model';
import { TopicStatus } from '../../../../base/models/dto/topic-status.model';
import { RequestState } from '../../../../base/models/dto/request-state.model';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';

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
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  application: ClarificationRequest = {
    id: '13',
    submissionDate: new Date(),
    state: RequestState.Waiting,
    topic: this.topic,
    newDescription: 'lorem ipsum dior',
    newName: 'lorem ipsum dior'
  };

  applications: ClarificationRequest[] = [
    this.application,
    this.application,
    this.application,
    this.application,
    this.application,
    this.application,
    this.application
  ];

  constructor(private readonly router: Router) {
  }

  showDetails(application: ClarificationRequest): void {
    this.router.navigate(['/dean/clarification/', application.id]);
  }
}
