import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  loadReservationForIdAction,
  loadReservationForIdIfNeededAction,
  loadStudentReservationsAction,
  loadStudentReservationsIfNeededAction,
  loadThesesAction,
  loadThesesFailedAction,
  loadThesesIfNeededAction,
  loadThesesStoreCollectionSuccessAction,
  loadThesisForIdAction,
  loadThesisForIdIfNeededAction,
  loadThesisStoreInstanceSuccessAction
} from './theses.actions';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import { selectThesesDataForTypeAndId, selectThesesDataIdsForTypeAndKey } from './theses.selectors';
import { ThesesStateKey } from './theses.state';
import { ThesesApiService } from '../../services/api/theses-api.service';


@Injectable()
export class ThesesEffects {

  loadThesesIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadThesesIfNeededAction),
    mergeIfNil(({ key }) => this.store.select(
      selectThesesDataIdsForTypeAndKey, { resourceType: ThesesStateKey.THESES, key }
    )),
    map(({ options, key }) => loadThesesAction({ options, key }))
  ));

  loadThesesAction = createEffect(() => this.actions.pipe(
    ofType(loadThesesAction),
    mergeMap(({ options, key }) =>
      this.thesesApiService.getThesesForUserRole(options).pipe(
        map(collection => loadThesesStoreCollectionSuccessAction(
          { resourceType: ThesesStateKey.THESES, collection, key })),
        catchError(error => of(loadThesesFailedAction({ error })))
      ))
  ));

  loadThesisForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadThesisForIdIfNeededAction),
    mergeIfNil(({ id }) => this.store.select(
      selectThesesDataForTypeAndId, { resourceType: ThesesStateKey.THESES, id }
    )),
    map(({ id }) => loadThesisForIdAction({ id }))
  ));

  loadThesisForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadThesisForIdAction),
    mergeMap(({ id }) => this.thesesApiService.getThesisForId(id).pipe(
      map(instance => loadThesisStoreInstanceSuccessAction(
        { resourceType: ThesesStateKey.THESES, instance }
      )),
      catchError(error => of(loadThesesFailedAction({ error })))
    ))
  ));

  loadStudentReservationsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentReservationsIfNeededAction),
    mergeIfNil(({ key, studentId }) => this.store.select(
      selectThesesDataIdsForTypeAndKey, { resourceType: ThesesStateKey.RESERVATIONS, key })
    ),
    map(({ key, studentId }) => loadStudentReservationsAction({ key, studentId }))
  ));

  loadRequestsAction = createEffect(() => this.actions.pipe(
    ofType(loadStudentReservationsAction),
    mergeMap(({ key, studentId }) =>
      this.thesesApiService.getStudentReservations(studentId).pipe(
        map(collection => loadThesesStoreCollectionSuccessAction(
          { resourceType: ThesesStateKey.RESERVATIONS, collection, key }
        )),
        catchError(error => of(loadThesesFailedAction({ error })))
      ))
  ));

  loadReservationForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadReservationForIdIfNeededAction),
    mergeIfNil(({ id }) => this.store.select(
      selectThesesDataForTypeAndId, { resourceType: ThesesStateKey.RESERVATIONS, id }
    )),
    map(({ id }) => loadReservationForIdAction({ id }))
  ));

  loadReservationForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadReservationForIdAction),
    mergeMap(({ id }) => this.thesesApiService.getReservationForId(id).pipe(
      map(instance => loadThesisStoreInstanceSuccessAction(
        { resourceType: ThesesStateKey.RESERVATIONS, instance }
      )),
      catchError(error => of(loadThesesFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly thesesApiService: ThesesApiService) {
  }

}
