import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../../base/models/dto/thesis-topic.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from '../../../../../base/models/dto/reservation.model';
import { FakeSessionData } from '../../../../../../fakes/fake.data';

@Component({
  selector: 'app-student-proposition-details',
  templateUrl: './student-proposition-details.component.html',
  styleUrls: ['./student-proposition-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentPropositionDetailsComponent implements OnInit {

  form?: FormGroup;

  topic: Thesis = FakeSessionData.topic;

  reservation: Reservation = FakeSessionData.reservation;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  confirm() {
    this.router.navigate(['/student/reservations']);
  }

  reject() {
    this.router.navigate(['/student/reservations']);
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
