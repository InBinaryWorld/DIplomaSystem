import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FakeSessionData } from '../../../../../fakes/fake.data';
import { Router } from '@angular/router';
import { BaseRequest } from '../../../../base/models/dto/base-request.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';

@Component({
  selector: 'app-student-topic-change',
  templateUrl: './student-topic-changes.component.html',
  styleUrls: ['./student-topic-changes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicChangesComponent {

  changeRequests: ChangeRequest[] = [
    FakeSessionData.changeRequest,
    FakeSessionData.changeRequest,
    FakeSessionData.changeRequest,
    FakeSessionData.changeRequest
  ];


  constructor(private readonly router: Router) {
  }

  public requestDetails(request: ChangeRequest): void {
    this.router.navigate(['/student/topic-changes/details', request.id]).then();
  }

  public createRequest() {
    this.router.navigate(['/student/topic-changes/create']).then();
  }

  public getStatusTranslationKey(item: BaseRequest): string {
    return TranslationKeys.forRequestStatus(item.status);
  }
}
