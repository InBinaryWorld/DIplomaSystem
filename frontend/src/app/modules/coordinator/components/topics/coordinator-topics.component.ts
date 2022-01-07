import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './coordinator-topics.component.html',
  styleUrls: ['./coordinator-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorTopicsComponent {
}
