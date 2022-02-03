import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../../base/services/requests.service';
import { Role } from '../../../../base/models/dto/role.model';
import { TranslationKeys } from '../../../../base/utils/translation-keys.utils';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { SessionService } from '../../../../base/services/session.service';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { BaseRequest } from '../../../../base/models/dto/base-request.model';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';
import { filterExists } from '../../../../core/tools/filter-exists';
import { IdType } from '../../../../base/models/dto/id.model';

@Component({
  selector: 'app-student-topic-change-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationDetailsComponent extends RoleComponent implements OnInit {

  form?: FormGroup;
  request?: ChangeRequest;
  supervisor: any;

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
      topic: [],
      description: [],
      supervisorName: []
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

  private setFormData(request: ChangeRequest): void {
    this.form!.setValue({
      topic: 'TODO: topic',
      description: 'TODO: description',
      supervisorName: 'TODO: John Lennon'
    });
    this.markForCheck();
  }

  private getRequest(userRole: UserRole, requestId: IdType): Observable<ChangeRequest> {
    return this.requestsService.getChangeRequestForId(requestId).pipe(filterExists());
  }

  public getStatusTranslationKey(item: BaseRequest): string {
    return TranslationKeys.forRequestStatus(item.status);
  }

}
