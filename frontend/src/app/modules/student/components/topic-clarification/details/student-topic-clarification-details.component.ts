import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '../../../../../core/components/base/base-component.directive';
import { ThesisTopic } from '../../../../../base/models/dto/thesis-topic.model';
import { Observable } from 'rxjs';
import { TopicStatus } from '../../../../../base/models/dto/topic-status.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { extractRoleId } from '../../../../../core/tools/filter-role';
import { Role } from '../../../../../base/models/dto/role.model';
import { RequestsStoreService } from '../../../../../base/services/requests-store.service';
import { ClarificationRequest } from '../../../../../base/models/dto/clarification-request.model';
import { SessionStoreService } from '../../../../../base/services/session-store.service';

@Component({
  selector: 'app-student-topic-clarification-details',
  templateUrl: './student-topic-clarification-details.component.html',
  styleUrls: ['./student-topic-clarification-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicClarificationDetailsComponent extends BaseComponent implements OnInit {

  request?: ClarificationRequest;

  currentTopicForm?: FormGroup;
  newTopicForm?: FormGroup;


  private topic = {
    id: '10',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

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

  // const imageIdSource = this.route.paramMap.pipe(
  //   map(params => params.get('imageId')),
  //   filter(id => !!id),
  //   distinctUntilChanged(),
  //   tap(() => this.clearViewData()),
  //   shareReplay(1)
  // );

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
