import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { Reservation } from '../../models/dto/reservation.model';
import { ReservationMember } from '../../models/dto/reservation-member.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { UserRole } from '../../models/dto/user-role.model';
import { Thesis } from '../../models/dto/thesis.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  getThesesForUserRole(userRole: UserRole): Observable<Thesis[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('role', userRole.role);
    queryParams.addIfValueExists('roleId', userRole.id);
    return this.http.getWithLabel(ApiLabel.GET_THESES, undefined, queryParams);
  }

  getThesisForId(id: string): Observable<Thesis> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('id', id);
    return this.http.getWithLabel(ApiLabel.GET_THESIS, undefined, queryParams);
  }

  getStudentReservations(studentId: string): Observable<Reservation[]> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', studentId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATIONS);
  }

  getReservationForId(reservationId: string): Observable<Reservation> {
    const query = new RequestParams();
    query.addIfValueExists('id', reservationId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATION);
  }

  getReservationMembers(reservationId: string): Observable<ReservationMember[]> {
    const query = new RequestParams();
    query.addIfValueExists('reservationId', reservationId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATION_MEMBERS, undefined, query);
  }

}
