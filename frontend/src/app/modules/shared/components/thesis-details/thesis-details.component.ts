import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Role } from '../../../../base/models/dto/role.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { SessionService } from '../../../../base/services/session.service';
import { UserRole } from '../../../../base/models/dto/user-role.model';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { ThesesService } from '../../../../base/services/theses.service';
import { IdType } from '../../../../base/models/dto/id.model';

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

  reloadTrigger = new BehaviorSubject<boolean>(true);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly thesesService: ThesesService,
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
      description: [],
      numberOfStudents: []
    });
  }

  private loadThesis(): void {
    this.addSubscription(
      combineLatest([this.userRoleSource, this.thesisIdSource, this.reloadTrigger])
        .pipe(switchMap(([userRole, id]) => this.getDataSource(userRole, id)))
        .subscribe(([userRole, thesis]) => {
          this.userRole = userRole!;
          this.thesis = thesis!;
          this.setFormData(thesis);
        })
    );
  }

  private getDataSource(userRole: UserRole, requestId: IdType): Observable<[UserRole, Thesis]> {
    return this.thesesService.getThesisForId(requestId)
      .pipe(map(thesis => [userRole, thesis] as [UserRole, Thesis]));
  }

  private setFormData(thesis: Thesis): void {
    this.form!.setValue({
      topic: thesis.topic,
      supervisorName: 'TODO: John Lennon',
      description: thesis.description,
      numberOfStudents: thesis.numberOfStudents
    });
    this.markForCheck();
  }

  public getStatusTranslationKey(item: Thesis): string {
    return TranslationKeys.forThesisStatus(item.status);
  }

}
