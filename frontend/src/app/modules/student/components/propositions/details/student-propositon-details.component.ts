import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from '../../../../../base/models/dto/thesis-topic.model';
import { TopicStatus } from '../../../../../base/models/dto/topic-status.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from '../../../../../base/models/dto/reservation.model';
import { ReservationStatus } from '../../../../../base/models/dto/reservation-status.model';

@Component({
  selector: 'app-student-proposition-details',
  templateUrl: './student-propositon-details.component.html',
  styleUrls: ['./student-propositon-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentPropositonDetailsComponent implements OnInit {

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

  reservation: Reservation = {
    id: '1',
    creationDate: new Date(),
    status: ReservationStatus.CONFIRMED,
    topicId: '12'
  };

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