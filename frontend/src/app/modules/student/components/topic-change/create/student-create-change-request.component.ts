import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThesesService } from '../../../../../base/services/theses.service';
import { RequestsService } from '../../../../../base/services/requests.service';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { map, Observable, switchMap } from 'rxjs';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { AppValidators } from '../../../../../base/utils/validators.utils';
import { filterExists } from '../../../../../core/tools/filter-exists';
import { first } from 'rxjs/operators';
import { IdType } from '../../../../../base/models/dto/id.model';
import { UserService } from '../../../../../base/services/user.service';
import { Employee } from '../../../../../base/models/dto/employee.model';
import { Student } from '../../../../../base/models/dto/student.model';

@Component({
  selector: 'app-student-topic-create-clarification',
  templateUrl: './student-create-change-request.component.html',
  styleUrls: ['./student-create-change-request.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateChangeRequestComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  student?: Student;
  baseThesis?: Thesis;
  supervisors?: any[];

  errorVisible = false;


  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly thesesService: ThesesService,
              private readonly requestsService: RequestsService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  confirm() {
    const formData = this.form?.value;
    const request = this.prepareRequestForFormData(this.student!.id, this.baseThesis!, formData);
    this.requestsService.createChangeRequest(this.baseThesis!.id, request).subscribe({
      next: (request) => this.router.navigate(['/student/change-requests/details/', request.id]),
      error: () => this.errorVisible = true
    });
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
    this.addSubscription(
      this.getDataSource().subscribe(([student, thesis, supervisors]) => {
        this.baseThesis = thesis;
        this.student = student;
        this.supervisors = supervisors;
        this.setFormData(thesis);
      })
    );
  }

  private getDataSource(): Observable<[Student, Thesis, any[]]> {
    return this.userRoleSource.pipe(
      switchMap(userRole => this.userService.getStudentForId(userRole.id)),
      switchMap(student => this.getBaseThesis(student).pipe(
        switchMap(thesis => this.userService.getAvailableSupervisors(thesis.diplomaSessionId).pipe(
            map(supervisors => ([student, thesis, supervisors] as [Student, Thesis, Employee[]]))
          )
        )
      ))
    );
  }

  private getBaseThesis(student: Student): Observable<Thesis> {
    return this.thesesService.getThesisForStudentConfirmedReservationInActiveSession(student)
      .pipe(filterExists(), first());
  }

  private setFormData(thesis: Thesis): void {
    this.form?.setValue({
      topic: thesis.topic,
      description: thesis.description,
      supervisorId: thesis.supervisorId
    });
    this.markForCheck();
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  // TODO: check and correct
  private prepareRequestForFormData(studentId: IdType, thesis: Thesis, formData: any): any {
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
