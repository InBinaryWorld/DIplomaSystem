import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from "../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../shared/dto/topic-status.model";

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './program-committee-topics.component.html',
  styleUrls: ['./program-committee-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicsComponent {

  public topicsApprovedByCoordinator: ThesisTopic[] = [
    {
      id: '12',
      name: 'Predykcja zachowań ludzi podczas lockdownu',
      description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
      personCount: 1,
      status: TopicStatus.APPROVED_BY_COORDINATOR,
      reportedByStudent: false,
      fillingDate: new Date()
    }
  ];

  public topicsWithCommitteeDecision: ThesisTopic[] = [
    {
      id: '22',
      name: 'Predykcja zachowań ludzi podczas lockdownu 2',
      description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
      personCount: 1,
      status: TopicStatus.APPROVED_BY_COMMITTEE,
      reportedByStudent: false,
      fillingDate: new Date()
    }
  ];

}
