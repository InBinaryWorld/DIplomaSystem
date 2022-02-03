import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../../base/models/dto/role.model';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { filterExists } from '../../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { UserRole } from '../../../../../base/models/dto/user-role.model';
import { BaseRequest } from '../../../../../base/models/dto/base-request.model';
import { TranslationKeys } from '../../../../../core/utils/translation-keys.utils';
import { RequestsService } from '../../../../../base/services/requests.service';
import { SessionService } from '../../../../../base/services/session.service';
import { IdType } from '../../../../../base/models/dto/id.model';

@Component({
  selector: 'app-student-topic-clarification-details',
  templateUrl: './student-clarification-request-details.component.html',
  styleUrls: ['./student-clarification-request-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentClarificationRequestDetailsComponent extends RoleComponent implements OnInit {

  form?: FormGroup;
  request?: ClarificationRequest;

  reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly requestsService: RequestsService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  get requestId(): Observable<string> {
    return this.getPathParam(this.activatedRoute, 'requestId');
  }

  ngOnInit(): void {
    this.initForm();
    this.loadRequest();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      currentThesisTopic: [],
      currentDescription: [],
      newThesisTopic: [],
      newDescription: []
    });
  }

  private loadRequest(): void {
    this.addSubscription(
      combineLatest([this.userRoleSource, this.requestId, this.reloadTrigger])
        .pipe(switchMap(([userRole, id]) => this.getRequest(userRole, id)))
        .subscribe(request => {
          this.request = request!;
          this.setFormData(request);
        })
    );
  }

  private setFormData(request: ClarificationRequest): void {
    this.form!.setValue({
      currentThesisTopic: 'TODO: Current topic',
      currentDescription: 'TODO: Current description',
      newThesisTopic: request.newTopic,
      newDescription: request.newDescription
    });
    this.markForCheck();
  }

  private getRequest(userRole: UserRole, requestId: IdType): Observable<ClarificationRequest> {
    return this.requestsService.getClarificationRequestForId(userRole, requestId)
      .pipe(filterExists());
  }

  public getStatusTranslationKey(item: BaseRequest): string {
    return TranslationKeys.forRequestStatus(item.status);
  }

  // private reload(): void {
  //   this.reloadTrigger.next(true);
  // }
  //
  // rejectRequest(request: ClarificationRequest) {
  //   this.addSubscription(
  //     this.userRole.pipe(first(), switchMap(userRole =>
  //       this.requestsStoreService.rejectClarificationRequest(userRole, request.id)
  //     )).subscribe(() => this.reload())
  //   );
  // }
  //
  // isRejectPossible(request: ClarificationRequest): any {
  //   return request.status == RequestStatus.WAITING;
  // }

}
