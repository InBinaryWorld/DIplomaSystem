import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from "../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../shared/dto/topic-status.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './coordinator-topics.component.html',
  styleUrls: ['./coordinator-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorTopicsComponent {
  private topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  public topics: ThesisTopic[] = [
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic
  ];


  constructor(private readonly router: Router) {
  }

  public reviewTopic(topic: ThesisTopic): void {
    this.router.navigate(['/coordinator/topic', topic.id]).then();
  }
}
