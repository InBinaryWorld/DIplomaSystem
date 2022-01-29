import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Timetable } from '../../../../../base/models/dto/timetable.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FakeSessionData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-section-show-timetable',
  templateUrl: './show-timetable.component.html',
  styleUrls: ['./show-timetable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowTimetableComponent implements OnInit {

  form?: FormGroup;

  public timetable: Timetable = FakeSessionData.timetable;

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
