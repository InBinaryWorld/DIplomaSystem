import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../core/components/base-component.directive';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { RequestsStoreService } from '../../../../../base/services/store/requests-store.service';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { SessionStoreService } from '../../../../../base/services/store/session-store.service';
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


  private topic = FakeSessionData.thesis;

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
      currentThesisTopic: this.topic.topic,
      newDescription: this.topic.description
    });
  }

  private setupForms(currentTopic: Partial<Thesis>, newTopic: Partial<Thesis>): void {
    this.currentTopicForm = this.formBuilder.group({
      thesisTopic: [],
      description: []
    });
  }
}
