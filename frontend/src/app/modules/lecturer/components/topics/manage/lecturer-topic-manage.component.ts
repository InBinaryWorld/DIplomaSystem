import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../../base/models/dto/thesis.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-lecturer-topic-manage',
  templateUrl: './lecturer-topic-manage.component.html',
  styleUrls: ['./lecturer-topic-manage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerTopicManageComponent implements OnInit {

  form?: FormGroup;

  topic: Thesis = FakeData.thesis;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/lecturer/topic']);
  }

  reject() {
    this.router.navigate(['/lecturer/topic']);
  }

  ngOnInit(): void {
    this.initForm();
    this.form!.setValue({
      thesisTopic: this.topic.topic,
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
