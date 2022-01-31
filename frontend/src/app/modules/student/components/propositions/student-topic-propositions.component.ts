import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { ReservationStatus } from '../../../../base/models/dto/reservation-status.model';
import { TranslationKeys } from '../../../../core/utils/translation-keys.utils';
import { FakeData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-student-topic-propositions',
  templateUrl: './student-topic-propositions.component.html',
  styleUrls: ['./student-topic-propositions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicPropositionsComponent {

  private topic = FakeData.thesis;

  private reservation: Reservation = {
    id: '1',
    creationDate: new Date(),
    status: ReservationStatus.CONFIRMED,
    thesisId: '12'
  };

  reservations: Reservation[] = [
    this.reservation,
    this.reservation,
    this.reservation,
    this.reservation
  ];

  topics: Thesis[] = [
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
