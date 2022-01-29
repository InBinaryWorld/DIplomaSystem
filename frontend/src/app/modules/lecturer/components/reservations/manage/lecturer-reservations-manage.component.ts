import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThesisTopic } from '../../../../../base/models/dto/thesis-topic.model';
import { TopicStatus } from '../../../../../base/models/dto/topic-status.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from '../../../../../base/models/dto/reservation.model';
import { ReservationStatus } from '../../../../../base/models/dto/reservation-status.model';
import { TranslationKeys } from '../../../../../core/utils/translation-keys.utils';
import { isNotNil } from '../../../../../core/tools/is-not-nil';

@Component({
  selector: 'app-lecturer-reservations-manage',
  templateUrl: './lecturer-reservations-manage.component.html',
  styleUrls: ['./lecturer-reservations-manage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerReservationsManageComponent implements OnInit {

  form?: FormGroup;

  private allowedStatusesForApproveAction: ReservationStatus[] = [
    ReservationStatus.SUBMITTED,
    ReservationStatus.REJECTED_BY_LECTURER
  ];

  private allowedStatusesForRejectAction: ReservationStatus[] = [
    ReservationStatus.SUBMITTED,
    ReservationStatus.ACCEPTED
  ];

  private topic: ThesisTopic = {
    id: '12',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  reservations: Reservation[] = [
    {
      id: '1',
      creationDate: new Date(),
      status: ReservationStatus.WAITING,
      topicId: '12'
    },
    {
      id: '1',
      creationDate: new Date(),
      status: ReservationStatus.SUBMITTED,
      topicId: '12'
    },
    {
      id: '1',
      creationDate: new Date(),
      status: ReservationStatus.ACCEPTED,
      topicId: '12'
    },
    {
      id: '1',
      creationDate: new Date(),
      status: ReservationStatus.ACCEPTED,
      topicId: '12'
    },
    {
      id: '1',
      creationDate: new Date(),
      status: ReservationStatus.REJECTED_BY_LECTURER,
      topicId: '12'
    },
    {
      id: '1',
      creationDate: new Date(),
      status: ReservationStatus.REJECTED_BY_STUDENT,
      topicId: '12'
    }
  ];

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  approve() {
    this.router.navigate(['/lecturer/reservations']);
  }

  reject() {
    this.router.navigate(['/lecturer/reservations']);
  }

  ngOnInit(): void {
    this.initForm();
    this.form!.setValue({
      thesisTopic: this.topic.name,
      numberOfStudents: this.topic.numberOfStudents,
      description: this.topic.description
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      thesisTopic: [],
      numberOfStudents: [],
      description: []
    });
  }

  public isTopicReserved(): boolean {
    return isNotNil(this.reservations.find(r => r.status === ReservationStatus.CONFIRMED));
  }

  public isRejectActionAvailable(reservation: Reservation): boolean {
    return this.allowedStatusesForRejectAction.includes(reservation.status);
  }

  public isApproveActionAvailable(reservation: Reservation): boolean {
    return !this.isTopicReserved() && this.allowedStatusesForApproveAction.includes(reservation.status);
  }

  getStatusTranslationKey(item: Reservation): string {
    return TranslationKeys.forReservationStatus(item.status);
  }

  approveReservation(item: Reservation): void {

  }

  rejectReservation(item: Reservation): void {

  }
}
