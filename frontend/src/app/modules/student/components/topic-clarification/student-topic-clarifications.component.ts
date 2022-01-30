import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';
import { BaseRequest } from '../../../../base/models/dto/base-request.model';
import { RequestsStoreService } from '../../../../base/services/store/requests-store.service';
import { switchMap } from 'rxjs';
import { SessionStoreService } from '../../../../base/services/store/session-store.service';
import { filterExists } from '../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { Role } from '../../../../base/models/dto/role.model';

@Component({
  selector: 'app-student-topic-clarifications',
  templateUrl: './student-topic-clarifications.component.html',
  styleUrls: ['./student-topic-clarifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicClarificationsComponent extends RoleComponent implements OnInit {

  clarificationRequests?: ClarificationRequest[];

  constructor(private readonly router: Router,
              private readonly requestsStoreService: RequestsStoreService,
              sessionStoreService: SessionStoreService,
              changeDetector: ChangeDetectorRef) {
    super(sessionStoreService, changeDetector);
  }

  get role(): Role {
    return Role.STUDENT;
  }

  ngOnInit(): void {
    this.addSubscription(
      this.userRole.pipe(
        switchMap(userRole => this.requestsStoreService.getClarificationRequestsForRole(userRole)),
        filterExists()
      ).subscribe(requests => {
        this.clarificationRequests = requests!;
        this.markForCheck();
      })
    );
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

  isCreatePossible(): boolean {
    // TODO:
    const hasReservedTopic = true;
    const timeIsCorrect = true;
    return hasReservedTopic && timeIsCorrect;
  }
}
