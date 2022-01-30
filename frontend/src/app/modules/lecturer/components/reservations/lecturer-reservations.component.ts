import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis-topic.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { ReservationStatus } from '../../../../base/models/dto/reservation-status.model';
import { groupBy } from 'lodash-es';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-lecturer-reservations',
  templateUrl: './lecturer-reservations.component.html',
  styleUrls: ['./lecturer-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerReservationsComponent {

  private topics: Thesis[] = [
    FakeSessionData.topic,
    FakeSessionData.topic,
    FakeSessionData.topic
  ];

  private reservations: Reservation[] = [
    FakeSessionData.reservation,
    FakeSessionData.reservation,
    FakeSessionData.reservation
  ];

  data = Object.entries(groupBy(this.reservations, res => res.topicId))
    .map(([topicId, reservations]) => {
      return {
        topic: this.topics.find(t => t.id === topicId)!,
        notReviewedReservations: reservations.filter(r => r.status === ReservationStatus.SUBMITTED).length
      };
    });

  constructor(private readonly router: Router) {
  }

  public manageTopicReservations(topic: Thesis): void {
    this.router.navigate(['/lecturer/reservations', topic.id]).then();
  }

}
