import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { Reservation } from '../../models/dto/reservation.model';
import { ReservationMember } from '../../models/dto/reservation-member.model';
import { RequestParams } from '../../../core/models/request-param.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  getReservationsForStudentId(studentId: string): Observable<Reservation[]> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', studentId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATIONS);
  }

  getReservationMembers(reservationId: string): Observable<ReservationMember[]> {
    const query = new RequestParams();
    query.addIfValueExists('reservationId', reservationId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATIONS_MEMBERS, undefined, query);
  }

}
