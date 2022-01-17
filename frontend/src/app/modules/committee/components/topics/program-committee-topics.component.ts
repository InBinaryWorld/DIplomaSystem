import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from "../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../shared/dto/topic-status.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './program-committee-topics.component.html',
  styleUrls: ['./program-committee-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicsComponent {

  private topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    personCount: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    fillingDate: new Date()
  };

  public topicsApprovedByCoordinator: ThesisTopic[] = [
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
    this.router.navigate(['/program-committee/topic', topic.id]).then();
  }
}
