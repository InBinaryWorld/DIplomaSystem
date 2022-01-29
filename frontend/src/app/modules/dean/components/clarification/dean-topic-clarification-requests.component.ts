import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './dean-topic-clarification-requests.component.html',
  styleUrls: ['./dean-topic-clarification-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeanTopicClarificationRequestsComponent {


  requests: ClarificationRequest[] = [
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest
  ];

  constructor(private readonly router: Router) {
  }

  showDetails(application: ClarificationRequest): void {
    this.router.navigate(['/dean/clarification/', application.id]);
  }
}
