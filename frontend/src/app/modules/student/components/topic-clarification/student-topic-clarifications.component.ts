import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';
import { BaseRequest } from '../../../../base/models/dto/base-request.model';
import { switchMap } from 'rxjs';
import { filterExists } from '../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { Role } from '../../../../base/models/dto/role.model';
import { RequestsService } from '../../../../base/services/requests.service';
import { DeadlinesService } from '../../../../base/services/deadlines.service';
import { SessionService } from '../../../../base/services/session.service';

@Component({
  selector: 'app-student-topic-clarifications',
  templateUrl: './student-topic-clarifications.component.html',
  styleUrls: ['./student-topic-clarifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicClarificationsComponent extends RoleComponent implements OnInit {

  clarificationRequests?: ClarificationRequest[];
  canCreateNew = false;

  constructor(private readonly deadlinesService: DeadlinesService,
              private readonly requestsService: RequestsService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get role(): Role {
    return Role.STUDENT;
  }

  ngOnInit(): void {
    this.initClarificationRequests();
    this.initButtonsAvailability();
  }

  private initClarificationRequests(): void {
    this.addSubscription(
      this.userRole.pipe(
        switchMap(userRole => this.requestsService.getClarificationRequestsForRole(userRole)),
        filterExists()
      ).subscribe(requests => {
        this.clarificationRequests = requests!;
        this.markForCheck();
      })
    );
  }

  initButtonsAvailability(): void {
    this.addSubscription(
      this.userRole.pipe(switchMap(userRole =>
        this.deadlinesService.canCreateClarificationRequest(userRole.id)
      )).subscribe(canCreateClarification => {
        this.canCreateNew = canCreateClarification;
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

}
