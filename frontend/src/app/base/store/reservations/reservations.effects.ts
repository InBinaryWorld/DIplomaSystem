import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  loadReservationForIdAction,
  loadReservationForIdIfNeededAction,
  loadReservationsFailedAction,
  loadReservationsSuccessAction,
  loadReservationSuccessAction,
  loadStudentReservationsAction,
  loadStudentReservationsIfNeededAction
} from './reservations.actions';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import { selectReservationsDataForTypeAndId, selectReservationsDataIdsForTypeAndKey } from './reservations.selectors';
import { ReservationsStateKey } from './reservations.state';
import { ReservationApiService } from '../../services/api/reservation-api.service';


@Injectable()
export class ReservationsEffects {

  loadStudentReservationsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentReservationsIfNeededAction),
    mergeIfNil(({ key, studentId }) => this.store.select(
      selectReservationsDataIdsForTypeAndKey, { resourceType: ReservationsStateKey.RESERVATIONS, key })
    ),
    map(({ key, studentId }) => loadStudentReservationsAction({ key, studentId }))
  ));

  loadRequestsAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentReservationsAction),
    mergeMap(({ key, studentId }) =>
      this.reservationApiService.getStudentReservations(studentId).pipe(
        map(collection => loadReservationsSuccessAction(
          { resourceType: ReservationsStateKey.RESERVATIONS, collection, key }
        )),
        catchError(error => of(loadReservationsFailedAction({ error })))
      ))
  ));

  loadReservationForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadReservationForIdIfNeededAction),
    mergeIfNil(({ id }) => this.store.select(
      selectReservationsDataForTypeAndId, { resourceType: ReservationsStateKey.RESERVATIONS, id }
    )),
    map(({ id }) => loadReservationForIdAction({ id }))
  ));

  loadReservationForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadReservationForIdAction),
    mergeMap(({ id }) => this.reservationApiService.getReservationForId(id).pipe(
      map(instance => loadReservationSuccessAction(
        { resourceType: ReservationsStateKey.RESERVATIONS, instance }
      )),
      catchError(error => of(loadReservationsFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly reservationApiService: ReservationApiService) {
  }

}
