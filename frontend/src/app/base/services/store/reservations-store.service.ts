import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import { selectRequestsStateError } from '../../store/requests/requests.selectors';
import {
  invalidateReservationsDataAction,
  loadReservationForIdAction,
  loadReservationForIdIfNeededAction,
  loadStudentReservationsAction,
  loadStudentReservationsIfNeededAction
} from '../../store/reservations/reservations.actions';
import { ReservationsStateKey } from '../../store/reservations/reservations.state';
import {
  selectReservationForId,
  selectReservationsForKey,
  selectReservationsStateInProgress
} from '../../store/reservations/reservations.selectors';
import { Reservation } from '../../models/dto/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
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

  public invalidateStoreForType(resourceType: ReservationsStateKey): void {
    this.store.dispatch(invalidateReservationsDataAction({ resourceType }));
  }

  public selectReservationsForKey(key: string): Observable<Reservation[] | undefined> {
    return this.store.select(selectReservationsForKey, key);
  }

  public selectReservationForId(id: string): Observable<Reservation | undefined> {
    return this.store.select(selectReservationForId, id);
  }


  public selectStateError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectReservationsStateInProgress;
  }

}
