import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThesesService } from '../../../../../base/services/theses.service';
import { map, Observable, switchMap } from 'rxjs';
import { AppValidators } from '../../../../../base/utils/validators.utils';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { Student } from '../../../../../base/models/dto/student.model';
import { Employee } from '../../../../../base/models/dto/employee.model';
import { UserService } from '../../../../../base/services/user.service';

@Component({
  selector: 'app-student-create-thesis',
  templateUrl: './student-create-thesis.component.html',
  styleUrls: ['./student-create-thesis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateThesisComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  supervisors?: any[];
  student?: Student;

  errorVisible = false;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly userService: UserService,
              private readonly thesesService: ThesesService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  confirm() {
    const formData = this.form?.value;
    const payload = this.prepareCreatePayload(this.student!, formData);
    this.thesesService.createThesis(payload).subscribe({
      next: () => this.redirectOnSuccess(),
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
      supervisorId: [undefined, Validators.required],
      numberOfStudents: [undefined, AppValidators.numberOfStudentsValidator],
      description: [undefined, AppValidators.descriptionValidator],
      fieldOfStudy: [{ value: '', disabled: true }]
    });
  }

  private initData(): void {
    this.addSubscription(this.getDataSource()
      .subscribe(([student, supervisors]) => {
        this.student = student;
        this.supervisors = supervisors;
        this.setFormData(student);
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<[Student, Employee[]]> {
    return this.userRoleSource.pipe(
      switchMap(userRole => this.userService.getStudentForId(userRole.id).pipe(
        switchMap(student => this.userService.getAvailableSupervisors(
          student.fieldOfStudy.activeDiplomaSessionId
        ).pipe(
          map(supervisors => ([student, supervisors] as [Student, Employee[]]))
        ))
      ))
    );
  }

  private setFormData(student: Student): void {
    this.form?.patchValue({
      fieldOfStudy: student.fieldOfStudy.name
    });
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  private prepareCreatePayload(student: Student, formData: any): Partial<Thesis> {
    return {
      topic: formData.topic,
      supervisorId: formData.supervisorId,
      authorStudentId: student.id,
      numberOfStudents: formData.numberOfStudents,
      description: formData.description,
      reportedByStudent: true,
      diplomaSessionId: student.fieldOfStudy.activeDiplomaSessionId
    };
  }

  public redirectOnSuccess(): void {
    this.router.navigate(['/student/topic-propositions']).then();
  }

}
