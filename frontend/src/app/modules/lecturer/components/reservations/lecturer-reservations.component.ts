import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from "../../../shared/dto/thesis-topic.model";
import { TopicStatus } from "../../../shared/dto/topic-status.model";
import { Router } from "@angular/router";
import { Reservation } from "../../../shared/dto/reservation.model";
import { ReservationStatus } from "../../../shared/dto/reservation-status.model";
import { groupBy } from "lodash-es";

@Component({
  selector: 'app-lecturer-reservations',
  templateUrl: './lecturer-reservations.component.html',
  styleUrls: ['./lecturer-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerReservationsComponent {

  private topics: ThesisTopic[] = [
    {
      id: '10',
      name: 'Predykcja zachowań ludzi podczas lockdownu',
      description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
      numberOfStudents: 1,
      status: TopicStatus.APPROVED_BY_COORDINATOR,
      reportedByStudent: false,
      submissionDate: new Date()
    }, {
      id: '12',
      name: 'Predykcja zachowań ludzi podczas lockdownu',
      description: "Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu",
      numberOfStudents: 1,
      status: TopicStatus.APPROVED_BY_COORDINATOR,
      reportedByStudent: false,
      submissionDate: new Date()
    }
  ];

  private reservation10: Reservation = {
    id: '1',
    creationDate: new Date(),
    status: ReservationStatus.SUBMITTED,
    topicId: '10'
  };

  private reservation12: Reservation = {
    id: '1',
    creationDate: new Date(),
    status: ReservationStatus.SUBMITTED,
    topicId: '12'
  };

  private reservations: Reservation[] = [
    this.reservation10,
    this.reservation10,
    this.reservation12,
    this.reservation12,
    this.reservation12,
    this.reservation12,
    this.reservation12,
    this.reservation12,
    this.reservation12,
    this.reservation12,
  ]

  data = Object.entries(groupBy(this.reservations, res => res.topicId))
    .map(([topicId, reservations]) => {
      return {
        topic: this.topics.find(t => t.id === topicId)!,
        notReviewedReservations: reservations.filter(r => r.status === ReservationStatus.SUBMITTED).length
      }
    })

  constructor(private readonly router: Router) {
  }

  public manageTopicReservations(topic: ThesisTopic): void {
    this.router.navigate(['/lecturer/reservations', topic.id]).then();
  }

}
