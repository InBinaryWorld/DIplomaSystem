import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from '../../../../base/models/dto/thesis-topic.model';
import { TopicStatus } from '../../../../base/models/dto/topic-status.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { ReservationStatus } from '../../../../base/models/dto/reservation-status.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';

@Component({
  selector: 'app-student-reservations',
  templateUrl: './student-reservations.component.html',
  styleUrls: ['./student-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentReservationsComponent {

  private topic = {
    id: '10',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  topics: ThesisTopic[] = [
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic
  ];

  confirmedReservation: Reservation = {
    id: '1',
    creationDate: new Date(),
    status: ReservationStatus.CONFIRMED,
    topicId: '10'
  };

  private reservation: Reservation = {
    id: '1',
    creationDate: new Date(),
    status: ReservationStatus.SUBMITTED,
    topicId: '12'
  };

  reservations: Reservation[] = [
    this.confirmedReservation,
    this.reservation,
    this.reservation,
    this.reservation,
    this.reservation
  ];


  constructor(private readonly router: Router) {
  }

  getStatusTranslationKey(item: Reservation): string {
    return TranslationKeys.forReservationStatus(item.status);
  }

  public topicDetails(topic: ThesisTopic): void {
    this.router.navigate(['/student/reservations/topic', topic.id]).then();
  }

  public reserveTopic(topic: ThesisTopic): void {
    this.router.navigate(['/student/reservations/create', topic.id]).then();
  }

  public reservationDetails(reservation: Reservation): void {
    this.router.navigate(['/student/reservations/details', reservation.id]).then();
  }

}
