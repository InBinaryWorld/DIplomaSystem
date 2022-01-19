import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Timetable } from "../../../../shared/dto/timetable.model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-section-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTimetableComponent implements OnInit {

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
      // numberOfStudents: this.topic.numberOfStudents,
      // description: this.topic.description
    })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      // thesisTopic: [],
      // supervisor: [],
      // numberOfStudents: [],
      // description: [],
    })
  }
}