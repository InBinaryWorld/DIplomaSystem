import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { ThesesService } from '../../../../../base/services/theses.service';
import { RequestsService } from '../../../../../base/services/requests.service';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { AppValidators } from '../../../../../core/utils/validators.utils';
import { filterExists } from '../../../../../core/tools/filter-exists';
import { first } from 'rxjs/operators';
import { UserRole } from '../../../../../base/models/dto/user-role.model';
import { FakeData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-student-topic-create-clarification',
  templateUrl: './student-create-change-request.component.html',
  styleUrls: ['./student-create-change-request.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateChangeRequestComponent extends RoleComponent implements OnInit {

  request?: ClarificationRequest;
  form?: FormGroup;

  studentId?: string;
  baseThesis?: Thesis;
  supervisors?: any[];

  errorVisible = false;


  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly thesesService: ThesesService,
              private readonly requestsService: RequestsService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  confirm() {
    const formData = this.form?.value;
    const request = this.prepareRequestForFormData(this.studentId!, this.baseThesis!, formData);
    this.requestsService.createChangeRequest(this.baseThesis!.id, request).subscribe({
      next: (request) => this.router.navigate(['/student/change-requests/details/', request.id]),
      error: () => this.errorVisible = true
    });
  }

  getErrors(controlName: string): ValidationErrors | null {
    const control = this.form!.get(controlName)!;
    return (control.dirty || control.touched) ? control.errors : null;
  }

  ngOnInit(): void {
    this.initForms();
    this.initData();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      topic: [undefined, AppValidators.topicValidator],
      description: [undefined, AppValidators.descriptionValidator],
      supervisorId: [undefined, Validators.required]
    });
  }

  private initData(): void {
    this.addSubscription(this.getDataSource()
      .subscribe(([userRole, thesis, supervisors]) => {
        this.baseThesis = thesis;
        this.studentId = userRole.id;
        this.supervisors = supervisors;
        this.setFormData(thesis);
      })
    );
  }

  private getDataSource(): Observable<[UserRole, Thesis, any[]]> {
    return this.userRoleSource.pipe(
      switchMap(userRole => this.getBaseThesis(userRole).pipe(
        switchMap(thesis => this.getSupervisors(thesis).pipe(
            map(supervisors => ([userRole, thesis, supervisors] as [UserRole, Thesis, any[]]))
          )
        )
      ))
    );
  }

  private getBaseThesis(userRole: UserRole): Observable<Thesis> {
    return this.thesesService.getActiveReservedThesisForStudentId(userRole.id)
      .pipe(filterExists(), first());
  }

  //TODO:
  private getSupervisors(thesis: Thesis): Observable<any[]> {
    // get for thesis.diplomaSessionId
    return of(FakeData.supervisors);
  }

  private setFormData(thesis: Thesis): void {
    this.form?.setValue({
      topic: thesis.topic,
      description: thesis.description,
      supervisorId: thesis.supervisorId
    });
    this.markForCheck();
  }

  get role(): Role {
    return Role.STUDENT;
  }

  // TODO: check and correct
  private prepareRequestForFormData(studentId: string, thesis: Thesis, formData: any): any {
    return {
      studentId: studentId,
      thesisId: thesis.id,
      newThesis: {
        topic: formData.topic,
        description: formData.description,
        supervisorId: formData.supervisorId
      } as Partial<Thesis>
    };

  }

}
