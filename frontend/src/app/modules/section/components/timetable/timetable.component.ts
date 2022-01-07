import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableComponent {
}
