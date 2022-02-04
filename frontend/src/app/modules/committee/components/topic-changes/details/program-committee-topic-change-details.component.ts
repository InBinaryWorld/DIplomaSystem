import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeRequest } from '../../../../../base/models/dto/change-request.model';
import { FakeData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-program-committee-topic-change-details',
  templateUrl: './program-committee-topic-change-details.component.html',
  styleUrls: ['./program-committee-topic-change-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicChangeDetailsComponent implements OnInit {

  form?: FormGroup;

  topic: Thesis = FakeData.thesis;

  request: ChangeRequest = FakeData.changeRequest;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/program-committee/change-requests']);
  }

  reject() {
    this.router.navigate(['/program-committee/change-requests']);
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
