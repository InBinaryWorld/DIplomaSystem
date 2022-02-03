import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../base/models/dto/role.model';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';
import { filterExists } from '../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { BaseRequest } from '../../../../base/models/dto/base-request.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { IdType } from '../../../../base/models/dto/id.model';
import { UserRole } from '../../../../base/models/dto/user-role.model';

@Component({
  selector: 'app-clarification-request-details',
  templateUrl: './clarification-request-details.component.html',
  styleUrls: ['./clarification-request-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClarificationRequestDetailsComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  userRole?: UserRole;
  request?: ClarificationRequest;

  private reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly requestsService: RequestsService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT, Role.DEAN];
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
      this.getDataSource().subscribe(([userRole, request]) => {
        this.userRole = userRole!;
        this.request = request!;
        this.setFormData(request);
      })
    );
  }

  private getDataSource(): Observable<[UserRole, ClarificationRequest]> {
    return combineLatest([this.userRoleSource, this.requestId, this.reloadTrigger]).pipe(
      switchMap(([userRole, id]) => this.getRequest(id).pipe(
        map(request => ([userRole, request] as [UserRole, ClarificationRequest]))
      ))
    );
  }

  private getRequest(requestId: IdType): Observable<ClarificationRequest> {
    return this.requestsService.getClarificationRequestForId(requestId)
      .pipe(filterExists());
  }

  private setFormData(request: ClarificationRequest): void {
    this.form!.setValue({
      currentThesisTopic: request.currentTopic,
      currentDescription: request.currentDescription,
      newThesisTopic: request.newTopic,
      newDescription: request.newDescription
    });
    this.markForCheck();
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
