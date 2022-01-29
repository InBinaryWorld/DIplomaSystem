import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from '../../../../../base/models/dto/thesis-topic.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeSessionData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-coordinator-topic-review',
  templateUrl: './coordinator-topic-review.component.html',
  styleUrls: ['./coordinator-topic-review.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorTopicReviewComponent implements OnInit {

  form?: FormGroup;

  topic: ThesisTopic = FakeSessionData.topic;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/coordinator/topic']);
  }

  reject() {
    this.router.navigate(['/coordinator/topic']);
  }

  ngOnInit(): void {
    this.initForm();
    this.form!.setValue({
      thesisTopic: this.topic.name,
      supervisor: 'Jan kowalski',
      numberOfStudents: this.topic.numberOfStudents,
      description: this.topic.description
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      thesisTopic: [],
      supervisor: [],
      numberOfStudents: [],
      description: []
    });
  }

}
