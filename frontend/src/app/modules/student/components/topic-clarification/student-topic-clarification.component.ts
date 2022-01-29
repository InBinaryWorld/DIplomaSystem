import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TopicStatus } from '../../../../base/models/dto/topic-status.model';

@Component({
  selector: 'app-student-topic-clarification',
  templateUrl: './student-topic-clarification.component.html',
  styleUrls: ['./student-topic-clarification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicClarificationComponent implements OnInit {

  form?: FormGroup;


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
              private readonly router: Router) {
  }

  confirm() {
    // this.router.navigate(['/topic-propositions/details',])
  }

  cancel() {
    // this.router.navigate(['/topic-propositions'])
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
