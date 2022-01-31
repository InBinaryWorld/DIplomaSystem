import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../../base/models/dto/role.model';
import { filterExists } from '../../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { UserRole } from '../../../../../base/models/dto/user-role.model';
import { BaseRequest } from '../../../../../base/models/dto/base-request.model';
import { TranslationKeys } from '../../../../../core/utils/translation-keys.utils';
import { RequestsService } from '../../../../../base/services/requests.service';
import { SessionService } from '../../../../../base/services/session.service';
import { ChangeRequest } from '../../../../../base/models/dto/change-request.model';

@Component({
  selector: 'app-student-topic-change-details',
  templateUrl: './student-change-request-details.component.html',
  styleUrls: ['./student-change-request-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentChangeRequestDetailsComponent extends RoleComponent implements OnInit {

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

  private getRequest(userRole: UserRole, requestId: string): Observable<ChangeRequest> {
    return this.requestsService.getChangeRequestForId(userRole, requestId).pipe(filterExists());
  }

  public getStatusTranslationKey(item: BaseRequest): string {
    return TranslationKeys.forRequestStatus(item.status);
  }

}
