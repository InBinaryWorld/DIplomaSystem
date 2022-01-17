import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Timetable } from "../../../../shared/dto/timetable.model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-section-show-timetable',
  templateUrl: './show-timetable.component.html',
  styleUrls: ['./show-timetable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowTimetableComponent implements OnInit {

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
