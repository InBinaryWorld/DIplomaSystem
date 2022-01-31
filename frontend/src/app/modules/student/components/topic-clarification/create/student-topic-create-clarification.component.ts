import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { AppValidators } from '../../../../../core/utils/validators.utils';
import { ThesesService } from '../../../../../base/services/theses.service';
import { RequestsService } from '../../../../../base/services/requests.service';
import { RoleComponent } from '../../../../../base/components/role-component.directive';
import { SessionService } from '../../../../../base/services/session.service';
import { switchMap } from 'rxjs';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { Role } from '../../../../../base/models/dto/role.model';
import { isNil } from 'lodash-es';

@Component({
  selector: 'app-student-topic-create-clarification',
  templateUrl: './student-topic-create-clarification.component.html',
  styleUrls: ['./student-topic-create-clarification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicCreateClarificationComponent extends RoleComponent implements OnInit {

  request?: ClarificationRequest;

  currentTopicForm?: FormGroup;
  newTopicForm?: FormGroup;

  thesis?: Thesis;
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
    const thesis = this.thesis;
    const formData = this.newTopicForm?.value;
    const request = this.prepareRequestForFormData(thesis!, formData);
    this.requestsService.createClarificationRequest(thesis!.id, request).subscribe({
      next: (request) => this.router.navigate(['/student/clarification-requests/details/', request.id]),
      error: () => this.errorVisible = true
    });
  }

  getErrors(controlName: string): ValidationErrors | null {
    const control = this.newTopicForm!.get(controlName)!;
    return (control.dirty || control.touched) ? control.errors : null;
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
    this.addSubscription(
      this.userRole.pipe(switchMap(userRole =>
        this.thesesService.getActiveReservedThesisForStudentId(userRole.id))
      ).subscribe(thesis => {
        this.thesis = thesis;
        this.setCurrentFormData(thesis);
      })
    );
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

  get role(): Role {
    return Role.STUDENT;
  }

  private prepareRequestForFormData(thesis: Thesis, formData: any): Partial<ClarificationRequest> {
    return {
      newTopic: formData.newThesisTopic,
      newDescription: formData.newDescription,
      thesisId: thesis.id
    };
  }

}
