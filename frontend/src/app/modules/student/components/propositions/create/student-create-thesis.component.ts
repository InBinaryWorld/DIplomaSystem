import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThesesService } from '../../../../../base/services/theses.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { AppValidators } from '../../../../../core/utils/validators.utils';
import { FakeData } from '../../../../../../fakes/fake.data';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { UserRole } from '../../../../../base/models/dto/user-role.model';
import { Student } from '../../../../../base/models/dto/student.model';

@Component({
  selector: 'app-student-create-thesis',
  templateUrl: './student-create-thesis.component.html',
  styleUrls: ['./student-create-thesis.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateThesisComponent extends RoleComponent implements OnInit {

  form?: FormGroup;

  supervisors?: any[];
  userRole?: UserRole;

  errorVisible = false;

  constructor(private readonly router: Router,
              private readonly formBuilder: FormBuilder,
              private readonly thesesService: ThesesService,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  confirm() {
    const formData = this.form?.value;
    // const payload = this.prepareCreatePayload(this.userRole!, formData);
    // this.thesesService.createThesis(payload).subscribe({
    //   next: () => this.redirectOnSuccess(),
    //   error: () => this.errorVisible = true
    // });
  }

  ngOnInit(): void {
    this.initForms();
    this.initData();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      topic: [undefined, AppValidators.topicValidator],
      supervisorId: [undefined, Validators.required],
      diplomaSessionId: [undefined, Validators.required],
      numberOfStudents: [undefined, AppValidators.numberOfStudentsValidator],
      description: [undefined, AppValidators.descriptionValidator]
    });
  }

  private initData(): void {
    this.addSubscription(this.getDataSource()
      .subscribe(([userRole, supervisors]) => {
        this.userRole = userRole;
        this.supervisors = supervisors;
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<[UserRole, any[]]> {
    return this.userRoleSource.pipe(
      switchMap(userRole => this.getSupervisors(userRole).pipe(
        map(supervisors => ([userRole, supervisors] as [UserRole, any[]]))
      ))
    );
  }

  //TODO: diplomaSessionId from userRole
  private getSupervisors(student: UserRole): Observable<any[]> {
    // get for thesis.diplomaSessionId
    return of(FakeData.supervisors);
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  private prepareCreatePayload(student: Student, formData: any): Partial<Thesis> {
    return {
      topic: formData.topic,
      description: formData.description,
      numberOfStudents: formData.numberOfStudents,
      supervisorId: formData.supervisorId,
      authorStudentId: student.id,
      reportedByStudent: true,
      diplomaSessionId: student.activeDiplomaSessionId
    };
  }

  public redirectOnSuccess(): void {
    this.router.navigate(['/student/topic-propositions']).then();
  }

}
