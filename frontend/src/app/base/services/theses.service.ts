import { Injectable } from '@angular/core';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Reservation } from '../models/dto/reservation.model';
import { ThesesStoreService } from './store/theses-store.service';
import { Thesis } from '../models/dto/thesis.model';
import { map, tap } from 'rxjs/operators';
import { ReservationStatus } from '../models/dto/reservation-status.model';
import { firstItem } from '../../core/tools/first-item';
import { isEmpty, isNil } from 'lodash-es';
import { LoadReservationsActionOptions, LoadThesesActionOptions } from '../store/theses/theses.actions';
import { ThesesApiService } from './api/theses-api.service';
import { ThesesStateKey } from '../store/theses/theses.state';
import { IdType } from '../models/dto/id.model';
import { ThesisStatus } from '../models/dto/topic-status.model';
import { ReservationMember } from '../models/dto/reservation-member.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesService {

  public inactiveThesisStates: ThesisStatus[] = [
    ThesisStatus.REJECTED_BY_LECTURER,
    ThesisStatus.REJECTED_BY_COORDINATOR,
    ThesisStatus.REJECTED_BY_COMMITTEE
  ];

  constructor(private readonly thesesStoreService: ThesesStoreService,
              private readonly thesesApiService: ThesesApiService) {
  }

  public invalidateTheses(): void {
    this.thesesStoreService.invalidateStoreForType(ThesesStateKey.THESES);
  }

  public invalidateReservations(): void {
    this.thesesStoreService.invalidateStoreForType(ThesesStateKey.RESERVATIONS);
  }

  public getThesisForLecturerAndDiplomaSession(lecturerId: IdType, diplomaSessionId: IdType): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.forLecturer(diplomaSessionId, lecturerId);
    return this.thesesStoreService.getTheses(options);
  }

  public getThesisWithStatus(diplomaSessionId: IdType, status: ThesisStatus): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.forStatus(diplomaSessionId, status);
    return this.thesesStoreService.getTheses(options);
  }

  public getApprovedTheses(diplomaSessionId: IdType): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.forStatus(diplomaSessionId, ThesisStatus.APPROVED_BY_COMMITTEE);
    return this.thesesStoreService.getTheses(options);
  }

  public getProposedByStudentTheses(diplomaSessionId: IdType, studentId: IdType): Observable<Thesis[]> {
    const options = LoadThesesActionOptions.proposedByStudent(diplomaSessionId, studentId);
    return this.thesesStoreService.getTheses(options);
  }

  public getThesisForId(thesisId: IdType): Observable<Thesis> {
    return this.thesesStoreService.getThesisForId(thesisId);
  }

  public getStudentReservations(studentId: IdType, diplomaSessionId: IdType): Observable<Reservation[]> {
    const options = LoadReservationsActionOptions.forStudent(studentId, diplomaSessionId);
    return this.thesesStoreService.getStudentReservations(options);
  }

  public getSupervisorReservations(supervisorId: IdType, diplomaSessionId: IdType): Observable<Reservation[]> {
    const options = LoadReservationsActionOptions.forSupervisor(supervisorId, diplomaSessionId);
    return this.thesesStoreService.getStudentReservations(options);
  }

  public getReservationForId(reservationId: IdType): Observable<Reservation> {
    return this.thesesStoreService.getReservationForId(reservationId);
  }

  public getConfirmedStudentReservation(studentId: IdType, diplomaSessionId: IdType): Observable<Reservation | undefined> {
    return this.getConfirmedStudentReservations(studentId, diplomaSessionId)
      .pipe(map(i => firstItem(i)));
  }

  public hasConfirmedStudentReservation(studentId: IdType, diplomaSessionId: IdType): Observable<boolean> {
    return this.getConfirmedStudentReservations(studentId, diplomaSessionId).pipe(map(i => !isEmpty(i)));
  }

  public getConfirmedStudentReservations(studentId: IdType, diplomaSessionId: IdType): Observable<Reservation[]> {
    return this.getStudentReservations(studentId, diplomaSessionId).pipe(
      map(reservations => reservations.filter(r => r.status === ReservationStatus.CONFIRMED))
    );
  }

  public getThesisForStudentConfirmedReservation(studentId: IdType, diplomaSessionId: IdType): Observable<Thesis> {
    return this.getConfirmedStudentReservation(studentId, diplomaSessionId).pipe(
      switchMap(r => isNil(r) ? EMPTY : this.getThesisForId(r.thesisId))
    );
  }

  public createThesis(thesis: Partial<Thesis>): Observable<Thesis> {
    return this.thesesApiService.createThesis(thesis)
      .pipe(tap(() => this.invalidateTheses()));
  }

  // on SUGGESTED state
  public confirmParticipationInReservation(memberId: IdType): Observable<ReservationMember> {
    return this.thesesApiService.confirmParticipationInReservation(memberId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  // on WILLING state
  public confirmMemberReservationInReservation(memberId: IdType): Observable<ReservationMember> {
    return this.thesesApiService.confirmMemberReservation(memberId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public abandonReservation(memberId: IdType): Observable<ReservationMember> {
    return this.thesesApiService.abandonReservation(memberId)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public createReservation(payload: object): Observable<Reservation> {
    return this.thesesApiService.createReservation(payload)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public rejectReservation(payload: object): Observable<Reservation> {
    return this.thesesApiService.rejectReservation(payload)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public acceptReservation(payload: object): Observable<Reservation> {
    return this.thesesApiService.acceptReservation(payload)
      .pipe(tap(() => this.invalidateReservations()));
  }

  public requestForThesisCorrectionsWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.requestForThesisCorrectionsWithCoordinator(coordinatorId, payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public rejectThesisWithCoordinator(coordinatorId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.rejectThesisWithCoordinator(coordinatorId, payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public approveThesisWithCoordinator(coordinatorId: IdType, thesisId: IdType): Observable<Thesis> {
    const payload = { coordinatorId, thesisId };
    return this.thesesApiService.approveThesisWithCoordinator(payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public rejectThesisWithCommitteeMember(committeeMemberId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.rejectThesisWithCommitteeMember(committeeMemberId, payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public approveThesisWithCommitteeMember(committeeMemberId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.approveThesisWithCommitteeMember(payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public rejectThesisWithLecturer(payload: object): Observable<Thesis> {
    return this.thesesApiService.rejectThesisWithLecturer(payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public correctThesisWithLecturer(payload: object): Observable<Thesis> {
    return this.thesesApiService.correctThesisWithLecturer(payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

  public acceptThesisWithLecturer(committeeMemberId: IdType, payload: object): Observable<Thesis> {
    return this.thesesApiService.acceptThesisWithLecturer(payload)
      .pipe(tap(() => this.invalidateTheses()));
  }

}
