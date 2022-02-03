import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { Reservation } from '../../models/dto/reservation.model';
import { ReservationMember } from '../../models/dto/reservation-member.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Thesis } from '../../models/dto/thesis.model';
import { LoadThesisActionOptions } from '../../store/theses/theses.actions';
import { IdType } from '../../models/dto/id.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  public getThesesForUserRole(options: LoadThesisActionOptions): Observable<Thesis[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('proposedBy', options.proposedByStudentId);
    queryParams.addIfValueExists('availableToReserveForStudentId', options.availableToReserveForStudentId);
    return this.http.getWithLabel(ApiLabel.GET_THESES, undefined, queryParams);
  }

  public getThesisForId(id: IdType): Observable<Thesis> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('id', id);
    return this.http.getWithLabel(ApiLabel.GET_THESIS, undefined, queryParams);
  }

  public getStudentReservations(studentId: IdType): Observable<Reservation[]> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', studentId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATIONS);
  }

  public getReservationForId(reservationId: IdType): Observable<Reservation> {
    const query = new RequestParams();
    query.addIfValueExists('id', reservationId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATION);
  }

  public getReservationMembers(reservationId: IdType): Observable<ReservationMember[]> {
    const query = new RequestParams();
    query.addIfValueExists('reservationId', reservationId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATION_MEMBERS, undefined, query);
  }

  public createThesis(thesis: Partial<Thesis>): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.CREATE_THESIS, thesis);
  }

}
