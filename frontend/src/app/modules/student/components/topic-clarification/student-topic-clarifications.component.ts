import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { FakeSessionData } from '../../../../../fakes/fake.data';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';
import { BaseRequest } from '../../../../base/models/dto/base-request.model';

@Component({
  selector: 'app-student-topic-clarifications',
  templateUrl: './student-topic-clarifications.component.html',
  styleUrls: ['./student-topic-clarifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicClarificationsComponent {

  clarificationRequests: ClarificationRequest[] = [
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest,
    FakeSessionData.clarificationRequest
  ];


  constructor(private readonly router: Router) {
  }

  public requestDetails(request: ClarificationRequest): void {
    this.router.navigate(['/student/clarification-requests/details', request.id]).then();
  }

  public createRequest() {
    this.router.navigate(['/student/clarification-requests/create']).then();
  }

  public getStatusTranslationKey(item: BaseRequest): string {
    return TranslationKeys.forRequestStatus(item.status);
  }
}
