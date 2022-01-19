import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Timetable } from "../../../../shared/dto/timetable.model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-section-create-timetable',
  templateUrl: './create-timetable.component.html',
  styleUrls: ['./create-timetable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTimetableComponent implements OnInit {

  form?: FormGroup;

  public timetable: Timetable = {
    id: '1',
    changingTopics: new Date(),
    selectingTopics: new Date(),
    submittingTopics: new Date(),
    certificatingTopics: new Date(),
    approvingTopicsByCommittee: new Date(),
    approvingTopicsByCoordinator: new Date()
  };

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      changingTopics: [new Date(), Validators.required],
      selectingTopics: [new Date(), Validators.required],
      submittingTopics: [new Date(), Validators.required],
      certificatingTopics: [new Date(), Validators.required],
      approvingTopicsByCommittee: [new Date(), Validators.required],
      approvingTopicsByCoordinator: [new Date(), Validators.required],
    })
  }
}