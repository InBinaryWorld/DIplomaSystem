import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Timetable } from "../../../shared/dto/timetable.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-section-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetablesComponent {


  public activeTimetable: Timetable[] = [
    {
      id: '1',
      changingTopics: new Date(),
      selectingTopics: new Date(),
      submittingTopics: new Date(),
      certificatingTopics: new Date(),
      approvingTopicsByCommittee: new Date(),
      approvingTopicsByCoordinator: new Date()
    },
    {
      id: '1',
      changingTopics: new Date(),
      selectingTopics: new Date(),
      submittingTopics: new Date(),
      certificatingTopics: new Date(),
      approvingTopicsByCommittee: new Date(),
      approvingTopicsByCoordinator: new Date()
    },
    {
      id: '1',
      changingTopics: new Date(),
      selectingTopics: new Date(),
      submittingTopics: new Date(),
      certificatingTopics: new Date(),
      approvingTopicsByCommittee: new Date(),
      approvingTopicsByCoordinator: new Date()
    },
    {
      id: '1',
      changingTopics: new Date(),
      selectingTopics: new Date(),
      submittingTopics: new Date(),
      certificatingTopics: new Date(),
      approvingTopicsByCommittee: new Date(),
      approvingTopicsByCoordinator: new Date()
    },
    {
      id: '1',
      changingTopics: new Date(),
      selectingTopics: new Date(),
      submittingTopics: new Date(),
      certificatingTopics: new Date(),
      approvingTopicsByCommittee: new Date(),
      approvingTopicsByCoordinator: new Date()
    },
    {
      id: '1',
      changingTopics: new Date(),
      selectingTopics: new Date(),
      submittingTopics: new Date(),
      certificatingTopics: new Date(),
      approvingTopicsByCommittee: new Date(),
      approvingTopicsByCoordinator: new Date()
    },
  ];

  constructor(private readonly router: Router) {
  }

  editTimetable(timetable: Timetable) {
    this.router.navigate(['/diploma-section/timetable/edit/', timetable.id]).then();
  }

  showTimetable(timetable: Timetable) {
    this.router.navigate(['/diploma-section/timetable/show', timetable.id]).then();
  }

  createTimetable() {
    this.router.navigate(['/diploma-section/timetable/create']).then();
  }

}
