import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from '../../../../base/models/dto/thesis-topic.model';
import { TopicStatus } from '../../../../base/models/dto/topic-status.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { ReservationStatus } from '../../../../base/models/dto/reservation-status.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';

@Component({
  selector: 'app-student-topic-propositions',
  templateUrl: './student-topic-propositions.component.html',
  styleUrls: ['./student-topic-propositions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicPropositionsComponent {

  private topic = {
    id: '10',
    name: 'Predykcja zachowań ludzi podczas lockdownu',
    description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
    numberOfStudents: 1,
    status: TopicStatus.APPROVED_BY_COORDINATOR,
    reportedByStudent: false,
    submissionDate: new Date()
  };

  private reservation: Reservation = {
    id: '1',
    creationDate: new Date(),
    status: ReservationStatus.CONFIRMED,
    topicId: '12'
  };

  reservations: Reservation[] = [
    this.reservation,
    this.reservation,
    this.reservation,
    this.reservation
  ];

  topics: ThesisTopic[] = [
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic
  ];

  constructor(private readonly router: Router) {
  }

  public reservationDetails(reservation: Reservation): void {
    this.router.navigate(['/student/topic-propositions/details', reservation.id]).then();
  }

  public createProposition() {
    this.router.navigate(['/student/topic-propositions/create']).then();
  }

  public getStatusTranslationKey(item: Reservation): string {
    return TranslationKeys.forReservationStatus(item.status);
  }
}
