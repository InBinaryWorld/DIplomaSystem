import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../base/models/dto/role.model';
import { filterExists } from '../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { BaseRequest } from '../../../../base/models/dto/base-request.model';
import { TranslationKeys } from '../../../../base/utils/translation-keys.utils';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';
import { IdType } from '../../../../base/models/dto/id.model';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { LabelBuilder } from '../../../../base/utils/label-builder.utils';

@Component({
  selector: 'app-change-request-details',
  templateUrl: './change-request-details.component.html',
  styleUrls: ['./change-request-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeRequestDetailsComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  userRole?: UserRole;
  request?: ChangeRequest;

  reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly requestsService: RequestsService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT, Role.PROGRAM_COMMITTEE_MEMBER];
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
      topic: [],
      description: [],
      supervisorName: []
    });
  }

  private loadRequest(): void {
    this.addSubscription(
      this.getDataSource().subscribe(([userRole, request]) => {
        this.userRole = userRole;
        this.request = request;
        this.setFormData(request);
      })
    );
  }

  private getDataSource(): Observable<[UserRole, ChangeRequest]> {
    return combineLatest([this.userRoleSource, this.requestId, this.reloadTrigger]).pipe(
      switchMap(([userRole, id]) => this.getRequest(id).pipe(
        map(request => ([userRole, request] as [UserRole, ChangeRequest]))
      ))
    );
  }

  private getRequest(requestId: IdType): Observable<ChangeRequest> {
    return this.requestsService.getChangeRequestForId(requestId).pipe(filterExists());
  }

  private setFormData(request: ChangeRequest): void {
    this.form!.setValue({
      topic: request.newThesis.topic,
      description: request.newThesis.description,
      supervisorName: LabelBuilder.forEmployee(request.supervisor)
    });
    this.markForCheck();
  }

  public getStatusTranslationKey(item: BaseRequest): string {
    return TranslationKeys.forRequestStatus(item.status);
  }

}
