import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { Reservation } from '../../models/dto/reservation.model';
import { ReservationMember } from '../../models/dto/reservation-member.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Thesis } from '../../models/dto/thesis.model';
import { LoadReservationsActionOptions, LoadThesisActionOptions } from '../../store/theses/theses.actions';
import { IdType } from '../../models/dto/id.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  public getThesesForUserRole(options: LoadThesisActionOptions): Observable<Thesis[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('status', options.status);
    queryParams.addIfValueExists('departmentId', options.departmentId);
    queryParams.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    queryParams.addIfValueExists('proposedByStudentId', options.proposedByStudentId);
    queryParams.addIfValueExists('proposedByStudentOnly', options.proposedByStudentOnly);
    return this.http.getWithLabel(ApiLabel.GET_THESES, undefined, queryParams);
  }

  public getThesisForId(id: IdType): Observable<Thesis> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('id', id);
    return this.http.getWithLabel(ApiLabel.GET_THESIS, undefined, queryParams);
  }

  public getStudentReservations(options: LoadReservationsActionOptions): Observable<Reservation[]> {
    const query = new RequestParams();
    query.addIfValueExists('studentId', options.studentId);
    query.addIfValueExists('diplomaSessionId', options.diplomaSessionId);
    return this.http.getWithLabel(ApiLabel.GET_RESERVATIONS, undefined, query);
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

  public confirmParticipationInReservation(memberId: IdType): Observable<ReservationMember> {
    const payload = { memberId };
    return this.http.postWithLabel(ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION, payload);
  }

  public confirmMemberReservation(memberId: IdType): Observable<ReservationMember> {
    const payload = { memberId };
    return this.http.postWithLabel(ApiLabel.CONFIRM_MEMBER_RESERVATION, payload);
  }

  public abandonReservation(memberId: IdType): Observable<ReservationMember> {
    const payload = { memberId };
    return this.http.postWithLabel(ApiLabel.ABANDON_MEMBER_RESERVATION, payload);
  }

  //TODO:
  public createReservation(payload: object): Observable<Reservation> {
    return this.http.postWithLabel(ApiLabel.CREATE_RESERVATION, payload);
  }

  public requestForThesisCorrectionsWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.REQUEST_THESIS_CORRECTIONS, payload);
  }

  public rejectThesisWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.REJECT_THESIS_WITH_COORDINATOR, payload);
  }

  public approveThesisWithCoordinator(payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.APPROVE_THESIS_WITH_COORDINATOR, payload);
  }

  public rejectThesisWithCommitteeMember(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER, payload);
  }

  public approveThesisWithCommitteeMember(payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER, payload);
  }

  public rejectThesisWithLecturer(payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.REJECT_THESIS_WITH_LECTURER, payload);
  }

  public correctThesisWithLecturer(payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.CORRECT_THESIS_WITH_LECTURER, payload);
  }

  public acceptThesisWithLecturer(payload: object): Observable<Thesis> {
    return this.http.postWithLabel(ApiLabel.ACCEPT_THESIS_WITH_LECTURER, payload);
  }

}
