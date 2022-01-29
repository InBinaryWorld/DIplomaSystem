import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from '../../../../../base/models/dto/thesis-topic.model';
import { TopicStatus } from '../../../../../base/models/dto/topic-status.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-committee-topic-review',
  templateUrl: './program-committee-topic-review.component.html',
  styleUrls: ['./program-committee-topic-review.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicReviewComponent implements OnInit {

  form?: FormGroup;

  topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/program-committee/topic']);
  }

  reject() {
    this.router.navigate(['/program-committee/topic']);
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
