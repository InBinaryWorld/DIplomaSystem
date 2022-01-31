import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import { selectRequestsStateError } from '../../store/requests/requests.selectors';
import { Reservation } from '../../models/dto/reservation.model';
import {
  invalidateThesesDataAction,
  loadReservationForIdAction,
  loadReservationForIdIfNeededAction,
  loadStudentReservationsAction,
  loadStudentReservationsIfNeededAction,
  loadThesesAction,
  loadThesesIfNeededAction,
  loadThesisForIdAction,
  loadThesisForIdIfNeededAction
} from '../../store/theses/theses.actions';
import {
  selectReservationForId,
  selectReservationsForKey,
  selectThesesForKey,
  selectThesesStateInProgress,
  selectThesisForId
} from '../../store/theses/theses.selectors';
import { UserRole } from '../../models/dto/user-role.model';
import { ThesesStateKey } from '../../store/theses/theses.state';
import { Thesis } from '../../models/dto/thesis.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getThesesForUserRole(userRole: UserRole, key: string): Observable<Thesis[] | undefined> {
    this.loadThesesForUserRole(userRole, key);
    return this.selectThesesForKey(key);
  }

  public getThesisForId(thesisId: string): Observable<Thesis | undefined> {
    this.loadThesisForId(thesisId);
    return this.selectThesisForId(thesisId);
  }

  public getStudentReservations(studentId: string, key: string): Observable<Reservation[] | undefined> {
    this.loadStudentReservations(studentId, key);
    return this.selectReservationsForKey(key);
  }

  public getReservationForId(reservationId: string): Observable<Reservation | undefined> {
    this.loadReservationForId(reservationId);
    return this.selectReservationForId(reservationId);
  }

  public getActiveReservationForStudent(studentId: string): Observable<Reservation | undefined> {
    // TODO:
    return of(undefined);
  }

  public loadThesesForUserRole(userRole: UserRole, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadThesesIfNeededAction({ userRole, key })
      : loadThesesAction({ userRole, key });
    this.store.dispatch(action);
  }

  public loadThesisForId(id: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadThesisForIdIfNeededAction({ id })
      : loadThesisForIdAction({ id });
    this.store.dispatch(action);
  }

  public loadStudentReservations(studentId: string, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadStudentReservationsIfNeededAction({ studentId, key })
      : loadStudentReservationsAction({ studentId, key });
    this.store.dispatch(action);
  }

  public loadReservationForId(id: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadReservationForIdIfNeededAction({ id })
      : loadReservationForIdAction({ id });
    this.store.dispatch(action);
  }

  public invalidateStoreForType(resourceType: ThesesStateKey): void {
    this.store.dispatch(invalidateThesesDataAction({ resourceType }));
  }

  public selectReservationsForKey(key: string): Observable<Reservation[] | undefined> {
    return this.store.select(selectReservationsForKey, key);
  }

  public selectReservationForId(id: string): Observable<Reservation | undefined> {
    return this.store.select(selectReservationForId, id);
  }

  public selectThesesForKey(key: string): Observable<Thesis[] | undefined> {
    return this.store.select(selectThesesForKey, key);
  }

  public selectThesisForId(id: string): Observable<Thesis | undefined> {
    return this.store.select(selectThesisForId, id);
  }

  public selectStateError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectThesesStateInProgress;
  }

}
