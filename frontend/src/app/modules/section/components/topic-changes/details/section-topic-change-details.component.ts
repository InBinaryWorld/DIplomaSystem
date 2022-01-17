import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from "../../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../../shared/dto/topic-status.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ChangeRequest } from "../../../../shared/dto/change-request.model";
import { ApplicationState } from "../../../../shared/dto/application-state.model";

@Component({
  selector: 'app-section-topic-change-details',
  templateUrl: './section-topic-change-details.component.html',
  styleUrls: ['./section-topic-change-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTopicChangeDetailsComponent implements OnInit {

  form?: FormGroup;

  topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
    personCount: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    fillingDate: new Date()
  };

  application: ChangeRequest = {
    id: '13',
    oldTopic: this.topic,
    newTopic: this.topic,
    submissionDate: new Date(),
    state: ApplicationState.Waiting
  }

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/diploma-section/topic-change'])
  }

  reject() {
    this.router.navigate(['/diploma-section/topic-change'])
  }

  ngOnInit(): void {
    this.initForm();
    this.form!.setValue({
      // thesisTopic: this.topic.name,
      // supervisor: "Jan kowalski",
      // personCount: this.topic.personCount,
      // description: this.topic.description
    })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      // thesisTopic: [],
      // supervisor: [],
      // personCount: [],
      // description: [],
    })
  }

}
