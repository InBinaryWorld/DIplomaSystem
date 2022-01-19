import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from "../../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../../shared/dto/topic-status.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-lecturer-topic-correct',
  templateUrl: './lecturer-topic-correct.component.html',
  styleUrls: ['./lecturer-topic-correct.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerTopicCorrectComponent implements OnInit {

  form?: FormGroup;

  topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/lecturer/topic'])
  }

  reject() {
    this.router.navigate(['/lecturer/topic'])
  }

  ngOnInit(): void {
    this.initForm();
    this.form!.setValue({
      thesisTopic: this.topic.name,
      supervisor: "Jan kowalski",
      numberOfStudents: this.topic.numberOfStudents,
      description: this.topic.description
    })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      thesisTopic: [],
      supervisor: [],
      numberOfStudents: [],
      description: [],
    })
  }

}
