import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, NEVER, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { SessionService } from '../../../../base/services/session.service';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { ThesesService } from '../../../../base/services/theses.service';
import { IdType } from '../../../../base/models/dto/id.model';
import { GeneralResourcesService } from '../../../../base/services/general-resources.service';
import { DiplomaSession } from '../../../../base/models/dto/diploma-session.model';
import { LabelBuilder } from '../../../../base/utils/label-builder.utils';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { isNotNil } from '../../../../core/tools/is-not-nil';
import { ThesisStatus } from '../../../../base/models/dto/topic-status.model';
import { EmployeeRole } from '../../../../base/models/dto/employee-role.model';
import { Dictionary } from '../../../../core/models/dictionary.model';
import { AppValidators } from '../../../../base/utils/validators.utils';

@Component({
  selector: 'app-thesis-details',
  templateUrl: './thesis-details.component.html',
  styleUrls: ['./thesis-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThesisDetailsComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  thesis?: Thesis;
  userRole?: UserRole;
  diplomaSession?: DiplomaSession;

  canStudentReserve?: boolean;
  canCoordinatorConsiderThesis?: boolean;

  isErrorVisible = false;

  reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly deadlinesService: PermissionsService,
              private readonly thesesService: ThesesService,
              private readonly generalResourcesService: GeneralResourcesService,
              private readonly activatedRoute: ActivatedRoute,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT, Role.COORDINATOR];
  }

  get thesisIdSource(): Observable<string> {
    return this.getPathParam(this.activatedRoute, 'thesisId');
  }

  isWarningVisible(role: Role, canDoSth?: boolean): boolean {
    return this.userRole?.role === role && isNotNil(canDoSth) && !canDoSth;
  }


  ngOnInit(): void {
    this.loadThesis();
    this.checkButtonAvailability();
  }


  private loadThesis(): void {
    this.addSubscription(
      combineLatest([this.userRoleSource, this.thesisIdSource, this.reloadTrigger])
        .pipe(switchMap(([userRole, thesisId]) => this.getDataSource(userRole, thesisId)))
        .subscribe(([userRole, thesis, diplomaSession]) => {
          this.userRole = userRole;
          this.thesis = thesis;
          this.diplomaSession = diplomaSession;
          this.setFormData(userRole, thesis, diplomaSession);
        })
    );
  }

  private getDataSource(userRole: UserRole, requestId: IdType): Observable<[UserRole, Thesis, DiplomaSession]> {
    return this.thesesService.getThesisForId(requestId).pipe(
      switchMap(thesis => this.generalResourcesService.getDiplomaSessionForId(thesis.diplomaSessionId).pipe(
          map(diplomaSession => [userRole, thesis, diplomaSession] as [UserRole, Thesis, DiplomaSession])
        )
      )
    );
  }

  private checkButtonAvailability(): void {
    this.addSubscription(
      combineLatest([this.userRoleSource, this.thesisIdSource, this.reloadTrigger]).pipe(
        switchMap(([userRole, thesisId]) => {
          switch (userRole.role) {
            case Role.STUDENT :
              return this.checkForStudent(userRole.id, thesisId);
            case Role.COORDINATOR :
              return this.checkForCoordinator(userRole.id, thesisId);
          }
          return NEVER;
        })
      ).subscribe()
    );
  }

  checkForStudent(studentId: IdType, thesisId: IdType): Observable<void> {
    return this.deadlinesService.canReserveThesisWithId(studentId, thesisId).pipe(
      map(canReserve => {
        this.canStudentReserve = canReserve;
        this.markForCheck();
      })
    );
  }

  checkForCoordinator(coordinatorId: IdType, thesisId: IdType): Observable<void> {
    return this.deadlinesService.canCoordinatorConsiderThesis(coordinatorId, thesisId).pipe(
      map(canConsider => {
        this.canCoordinatorConsiderThesis = canConsider;
        this.markForCheck();
      })
    );
  }

  private setFormData(userRole: UserRole, thesis: Thesis, diplomaSession: DiplomaSession): void {
    const group = this.getGroupForRole(userRole, thesis, diplomaSession);
    this.form = this.formBuilder.group(group);
    this.markForCheck();
  }

  private getGroupForRole(userRole: UserRole, thesis: Thesis, diplomaSession: DiplomaSession): Dictionary<any> {
    switch (userRole.role) {
      case EmployeeRole.COORDINATOR:
        return this.getGroupForCoordinator(thesis, diplomaSession);
      default:
        return this.getDisabledGroup(thesis, diplomaSession);
    }
  }

  getGroupForCoordinator(thesis: Thesis, diplomaSession: DiplomaSession): Dictionary<any> {
    const isCommentDisabled: boolean = thesis.status !== ThesisStatus.WAITING;

    return {
      topic: [{ value: thesis.topic, disabled: true }],
      supervisorName: [{ value: LabelBuilder.forEmployee(thesis.supervisor), disabled: true }],
      diplomaSession: [{ value: LabelBuilder.forDiplomaSession(diplomaSession), disabled: true }],
      numberOfStudents: [{ value: thesis.numberOfStudents, disabled: true }],
      description: [{ value: thesis.description, disabled: true }],
      coordinatorComment: [
        { value: thesis.coordinatorComment, disabled: isCommentDisabled },
        AppValidators.coordinatorComment
      ]
    };
  }

  getDisabledGroup(thesis: Thesis, diplomaSession: DiplomaSession): Dictionary<any> {
    return {
      topic: [{ value: thesis.topic, disabled: true }],
      supervisorName: [{ value: LabelBuilder.forEmployee(thesis.supervisor), disabled: true }],
      diplomaSession: [{ value: LabelBuilder.forDiplomaSession(diplomaSession), disabled: true }],
      numberOfStudents: [{ value: thesis.numberOfStudents, disabled: true }],
      description: [{ value: thesis.description, disabled: true }],
      coordinatorComment: [{ value: thesis.coordinatorComment, disabled: true }]
    };
  }

  approveThesisWithCoordinator(): void {
    this.addSubscription(
      this.thesesService.approveThesisWithCoordinator(this.userRole!.id, this.thesis!.id).subscribe({
        next: () => this.reload(),
        error: () => this.isErrorVisible = true
      })
    );
  }

  requestForThesisCorrectionsWithCoordinator(): void {
    const comment = this.form!.value['coordinatorComment'];
    const payload = { comment, thesisId: this.thesis!.id };
    this.addSubscription(
      this.thesesService.requestForThesisCorrectionsWithCoordinator(this.userRole!.id, payload).subscribe({
        next: () => this.reload(),
        error: () => this.isErrorVisible = true
      })
    );
  }

  rejectThesisWithCoordinator(): void {
    const comment = this.form!.value['coordinatorComment'];
    const payload = { comment, thesisId: this.thesis!.id };
    this.addSubscription(
      this.thesesService.rejectThesisWithCoordinator(this.userRole!.id, payload).subscribe({
        next: () => this.reload(),
        error: () => this.isErrorVisible = true
      })
    );
  }

  public reserveTopic(): void {
    this.router.navigate(['/student/reservations/create', this.thesis!.id]).then();
  }

  public reload(): void {
    this.isErrorVisible = false;
    this.reloadTrigger.next(true);
  }

  isCoordinatorCommentVisible(): boolean {
    return this.thesis?.status === ThesisStatus.TO_CORRECT
      || this.thesis?.status === ThesisStatus.WAITING && this.userRole?.role === Role.COORDINATOR;
  }
}
