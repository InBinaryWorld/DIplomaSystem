import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from '../../../../base/models/dto/thesis-topic.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-student-reservations',
  templateUrl: './student-reservations.component.html',
  styleUrls: ['./student-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentReservationsComponent {

  private topic: ThesisTopic = FakeSessionData.topic;

  topics: ThesisTopic[] = [
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic
  ];

  confirmedReservation: Reservation = FakeSessionData.reservation;

  reservations: Reservation[] = [
    FakeSessionData.reservation,
    FakeSessionData.reservation,
    FakeSessionData.reservation,
    FakeSessionData.reservation,
    FakeSessionData.reservation,
    FakeSessionData.reservation,
    FakeSessionData.reservation
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
