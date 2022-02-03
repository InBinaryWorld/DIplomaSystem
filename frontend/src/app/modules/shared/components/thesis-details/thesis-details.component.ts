import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
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

  reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly thesesService: ThesesService,
              private readonly generalResourcesService: GeneralResourcesService,
              private readonly activatedRoute: ActivatedRoute,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  get thesisIdSource(): Observable<string> {
    return this.getPathParam(this.activatedRoute, 'thesisId');
  }

  ngOnInit(): void {
    this.initForm();
    this.loadThesis();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      topic: [],
      supervisorName: [],
      diplomaSession: [],
      numberOfStudents: [],
      description: []
    });
  }

  private loadThesis(): void {
    this.addSubscription(
      combineLatest([this.userRoleSource, this.thesisIdSource, this.reloadTrigger])
        .pipe(switchMap(([userRole, id]) => this.getDataSource(userRole, id)))
        .subscribe(([userRole, thesis, diplomaSession]) => {
          this.userRole = userRole;
          this.thesis = thesis;
          this.diplomaSession = diplomaSession;
          this.setFormData(thesis, diplomaSession);
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

  private setFormData(thesis: Thesis, diplomaSession: DiplomaSession): void {
    this.form!.setValue({
      topic: thesis.topic,
      supervisorName: LabelBuilder.forEmployee(thesis.supervisor),
      diplomaSession: LabelBuilder.forDiplomaSession(diplomaSession),
      numberOfStudents: thesis.numberOfStudents,
      description: thesis.description
    });
    this.markForCheck();
  }

}
