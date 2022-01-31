import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { FakeData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-student-reservations',
  templateUrl: './student-reservations.component.html',
  styleUrls: ['./student-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentReservationsComponent {

  private topic: Thesis = FakeData.thesis;

  topics: Thesis[] = [
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic
  ];

  confirmedReservation: Reservation = FakeData.reservation;

  reservations: Reservation[] = [
    FakeData.reservation,
    FakeData.reservation,
    FakeData.reservation,
    FakeData.reservation,
    FakeData.reservation,
    FakeData.reservation,
    FakeData.reservation
  ];


  constructor(private readonly router: Router) {
  }

  getStatusTranslationKey(item: Reservation): string {
    return TranslationKeys.forReservationStatus(item.status);
  }

  public topicDetails(topic: Thesis): void {
    this.router.navigate(['/student/reservations/topic', topic.id]).then();
  }

  public reserveTopic(topic: Thesis): void {
    this.router.navigate(['/student/reservations/create', topic.id]).then();
  }

  public reservationDetails(reservation: Reservation): void {
    this.router.navigate(['/student/reservations/details', reservation.id]).then();
  }

}
