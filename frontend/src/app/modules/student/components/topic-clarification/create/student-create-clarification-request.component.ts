import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { AppValidators } from '../../../../../base/utils/validators.utils';
import { ThesesService } from '../../../../../base/services/theses.service';
import { RequestsService } from '../../../../../base/services/requests.service';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { map, Observable, switchMap } from 'rxjs';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { isNil } from 'lodash-es';
import { UserRole } from '../../../../../base/models/dto/user-role.model';
import { filterExists } from '../../../../../core/tools/filter-exists';
import { first } from 'rxjs/operators';
import { IdType } from '../../../../../base/models/dto/id.model';

@Component({
  selector: 'app-student-topic-create-clarification',
  templateUrl: './student-create-clarification-request.component.html',
  styleUrls: ['./student-create-clarification-request.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentCreateClarificationRequestComponent extends RoleComponent implements OnInit {

  request?: ClarificationRequest;

  currentTopicForm?: FormGroup;
  newTopicForm?: FormGroup;

  thesis?: Thesis;
  studentId?: string;

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
    const formData = this.newTopicForm?.value;
    const request = this.prepareRequestForFormData(this.studentId!, this.thesis!, formData);
    this.requestsService.createClarificationRequest(this.thesis!.id, request).subscribe({
      next: (request) => this.router.navigate(['/student/change-requests/details/', request.id]),
      error: () => this.errorVisible = true
    });
  }

  ngOnInit(): void {
    this.initForms();
    this.initData();
  }

  private initForms(): void {
    this.currentTopicForm = this.formBuilder.group({
      currentThesisTopic: [],
      currentDescription: []
    });
    this.newTopicForm = this.formBuilder.group({
      newThesisTopic: [undefined, AppValidators.topicValidator],
      newDescription: [undefined, AppValidators.descriptionValidator]
    });
  }

  private initData(): void {
    this.addSubscription(this.getDataSource()
      .subscribe(([userRole, thesis]) => {
        this.thesis = thesis;
        this.studentId = userRole.id;
        this.setCurrentFormData(thesis);
      })
    );
  }

  private getDataSource(): Observable<[UserRole, Thesis]> {
    return this.userRoleSource.pipe(
      switchMap(userRole => this.getBaseThesis(userRole).pipe(
        map(thesis => ([userRole, thesis] as [UserRole, Thesis])))
      )
    );
  }

  private getBaseThesis(userRole: UserRole): Observable<Thesis> {
    return this.thesesService.getActiveReservedThesisForStudentId(userRole.id)
      .pipe(filterExists(), first());
  }


  private setCurrentFormData(thesis?: Thesis): void {
    if (isNil(thesis)) {
      this.currentTopicForm?.reset();
    } else {
      this.currentTopicForm?.setValue({
        currentThesisTopic: thesis.topic,
        currentDescription: thesis.description
      });
    }
    this.markForCheck();
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  private prepareRequestForFormData(studentId: IdType, thesis: Thesis, formData: any): Partial<ClarificationRequest> {
    return {
      studentId: studentId,
      newTopic: formData.newThesisTopic,
      newDescription: formData.newDescription,
      thesisId: thesis.id
    };
  }

}
