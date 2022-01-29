import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Timetable } from '../../../../base/models/dto/timetable.model';
import { Router } from '@angular/router';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-section-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetablesComponent {


  public activeTimetable: Timetable[] = [
    FakeSessionData.timetable,
    FakeSessionData.timetable,
    FakeSessionData.timetable,
    FakeSessionData.timetable,
    FakeSessionData.timetable,
    FakeSessionData.timetable
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
