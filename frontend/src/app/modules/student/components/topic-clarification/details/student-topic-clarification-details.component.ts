import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../../base/models/dto/role.model';
import { RequestsStoreService } from '../../../../../base/services/requests-store.service';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { SessionStoreService } from '../../../../../base/services/session-store.service';
import { filterExists } from '../../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { UserRole } from '../../../../../base/models/dto/user-role.model';
import { BaseRequest } from '../../../../../base/models/dto/base-request.model';
import { TranslationKeys } from '../../../../../core/utils/translation-keys.utils';

@Component({
  selector: 'app-student-topic-clarification-details',
  templateUrl: './student-topic-clarification-details.component.html',
  styleUrls: ['./student-topic-clarification-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicClarificationDetailsComponent extends RoleComponent implements OnInit {

  form?: FormGroup;
  request?: ClarificationRequest;

  reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly requestsStoreService: RequestsStoreService,
              sessionStoreService: SessionStoreService,
              changeDetector: ChangeDetectorRef) {
    super(sessionStoreService, changeDetector);
  }

  get role(): Role {
    return Role.STUDENT;
  }

  get requestId(): Observable<string> {
    return this.activatedRoute.paramMap.pipe(
      map(params => params.get('requestId')),
      filterExists(),
      distinctUntilChanged()
    );
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
      combineLatest([this.userRole, this.requestId, this.reloadTrigger])
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

  private getRequest(userRole: UserRole, requestId: string): Observable<ClarificationRequest> {
    return this.requestsStoreService.getClarificationRequestsForRoleById(userRole, requestId)
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
