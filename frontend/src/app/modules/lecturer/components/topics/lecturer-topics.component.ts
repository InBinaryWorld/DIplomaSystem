import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from "../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../shared/dto/topic-status.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './lecturer-topics.component.html',
  styleUrls: ['./lecturer-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerTopicsComponent {

  private topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  public submittedTopics: ThesisTopic[] = [
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

  public manageTopic(topic: ThesisTopic): void {
    this.router.navigate(['/lecturer/topic/manage', topic.id]).then();
  }

  public reviewTopic(topic: ThesisTopic): void {
    this.router.navigate(['/lecturer/topic/review', topic.id]).then();
  }

  public correctTopic(topic: ThesisTopic): void {
    this.router.navigate(['/lecturer/topic/correct', topic.id]).then();
  }

  public createTopic(): void {
    this.router.navigate(['/lecturer/topic/create']).then();
  }
}
