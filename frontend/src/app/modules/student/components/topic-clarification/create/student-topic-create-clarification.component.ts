import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../../../../base/models/dto/role.model';
import { BaseComponent } from '../../../../../core/components/base/base-component.directive';
import { ThesisTopic } from '../../../../../base/models/dto/thesis-topic.model';
import { RequestsStoreService } from '../../../../../base/services/requests-store.service';
import { Observable } from 'rxjs';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { SessionStoreService } from '../../../../../base/services/session-store.service';
import { extractRoleId } from '../../../../../core/tools/filter-role';
import { FakeSessionData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-student-topic-create-clarification',
  templateUrl: './student-topic-create-clarification.component.html',
  styleUrls: ['./student-topic-create-clarification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicCreateClarificationComponent extends BaseComponent implements OnInit {

  request?: ClarificationRequest;

  currentTopicForm?: FormGroup;
  newTopicForm?: FormGroup;


  private topic = FakeSessionData.topic;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly sessionStoreService: SessionStoreService,
              private readonly requestsStoreService: RequestsStoreService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  confirm() {
    // this.router.navigate(['/topic-propositions/details',])
  }

  cancel() {
    // this.router.navigate(['/topic-propositions'])
  }

  get studentId(): Observable<string> {
    return this.sessionStoreService.getContextRole()
      .pipe(extractRoleId(Role.STUDENT));
  }


  ngOnInit(): void {
    // this.addSubscription(
    //   this.studentId.pipe(
    //     switchMap(studentId => this.requestsStoreService.getStudentClarificationRequestsForRole(Role.STUDENT, studentId)),
    //     first(),
    //     map(requests => this.find)
    //   )
    // );

    // this.initForm();
    this.currentTopicForm!.setValue({
      currentThesisTopic: this.topic.name,
      newDescription: this.topic.description
    });
  }

  private setupForms(currentTopic: Partial<ThesisTopic>, newTopic: Partial<ThesisTopic>): void {
    this.currentTopicForm = this.formBuilder.group({
      thesisTopic: [],
      description: []
    });
  }
}
