import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from '../../../../../base/models/dto/thesis-topic.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeRequest } from '../../../../../base/models/dto/change-request.model';
import { FakeSessionData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-section-topic-change-details',
  templateUrl: './section-topic-change-details.component.html',
  styleUrls: ['./section-topic-change-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTopicChangeDetailsComponent implements OnInit {

  form?: FormGroup;

  topic: ThesisTopic = FakeSessionData.topic;

  request: ChangeRequest = FakeSessionData.changeRequest;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/diploma-section/topic-change']);
  }

  reject() {
    this.router.navigate(['/diploma-section/topic-change']);
  }

  ngOnInit(): void {
    this.initForm();
    this.form!.setValue({
      // thesisTopic: this.topic.name,
      // supervisor: "Jan kowalski",
      // numberOfStudents: this.topic.numberOfStudents,
      // description: this.topic.description
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      // thesisTopic: [],
      // supervisor: [],
      // numberOfStudents: [],
      // description: [],
    });
  }

}
