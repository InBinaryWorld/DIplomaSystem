import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, switchMap } from 'rxjs';
import { Reservation } from '../models/dto/reservation.model';
import { ThesesStoreService } from './store/theses-store.service';
import { StoreKeys } from '../utils/store-keys.utils';
import { Role } from '../models/dto/role.model';
import { Thesis } from '../models/dto/thesis.model';
import { map, tap } from 'rxjs/operators';
import { ReservationStatus } from '../models/dto/reservation-status.model';
import { filterExists } from '../../core/tools/filter-exists';
import { firstItem } from '../../core/tools/first-item';
import { isNil } from 'lodash-es';
import { LoadThesisActionOptions } from '../store/theses/theses.actions';
import { ThesesApiService } from './api/theses-api.service';
import { ThesesStateKey } from '../store/theses/theses.state';
import { IdType } from '../models/dto/id.model';
import { ThesisStatus } from '../models/dto/topic-status.model';
import { Student } from '../models/dto/student.model';
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

  public getThesisWithStatusForDepartment(departmentId: IdType, status: ThesisStatus): Observable<Thesis[]> {
    const options = LoadThesisActionOptions.forStatusAndDepartment(departmentId, status);
    return this.thesesStoreService.getTheses(options);
  }

  public getApprovedThesesForActiveSession(student: Student): Observable<Thesis[]> {
    const diplomaSessionId = student.fieldOfStudy.activeDiplomaSessionId;
    const options = LoadThesisActionOptions.forStudent(student.id, diplomaSessionId, ThesisStatus.APPROVED_BY_COMMITTEE);
    return this.thesesStoreService.getTheses(options);
  }

  public getProposedByStudentTheses(studentId: IdType): Observable<Thesis[]> {
    const options = LoadThesisActionOptions.proposedByStudent(studentId);
    return this.thesesStoreService.getTheses(options);
  }

  public getThesisForId(thesisId: IdType): Observable<Thesis> {
    return this.thesesStoreService.getThesisForId(thesisId);
  }

  public getStudentReservations(studentId: IdType): Observable<Reservation[]> {
    const key = StoreKeys.forUserRole({ id: studentId, role: Role.STUDENT });
    return this.thesesStoreService.getStudentReservations(studentId, key).pipe(filterExists());
  }

  public getReservationForId(reservationId: IdType): Observable<Reservation> {
    return this.thesesStoreService.getReservationForId(reservationId);
  }

  public getConfirmedStudentReservationInActiveSession(student: Student): Observable<Reservation | undefined> {
    return this.getConfirmedStudentReservationsForDiplomaSessionId(student.id, student.fieldOfStudy.activeDiplomaSessionId)
      .pipe(map(i => firstItem(i)));
  }

  public getConfirmedStudentReservationsForDiplomaSessionId(studentId: IdType, diplomaSessionId: IdType): Observable<Reservation[]> {
    return this.getStudentReservations(studentId).pipe(
      map(reservations => reservations.filter(r => {
        const isConfirmed = r.status === ReservationStatus.CONFIRMED;
        const isSessionMatch = r.thesis.diplomaSessionId === diplomaSessionId;
        return isConfirmed && isSessionMatch;
      })),
      shareReplay(1)
    );
  }

  public getThesisForStudentConfirmedReservationInActiveSession(student: Student): Observable<Thesis | undefined> {
    return this.getConfirmedStudentReservationInActiveSession(student).pipe(
      switchMap(r => isNil(r) ? of(undefined) : this.getThesisForId(r.thesisId))
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

}
