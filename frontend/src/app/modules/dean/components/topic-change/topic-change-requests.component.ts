import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './topic-change-requests.component.html',
  styleUrls: ['./topic-change-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicChangeRequestsComponent {
}
