import { createAction, props } from '@ngrx/store';
import { ReservationsStateKey, ReservationsType } from './reservations.state';

export const loadStudentReservationsAction = createAction(
  '[RESERVATIONS] Load student reservations',
  props<{ studentId: string, key: string }>()
);
export const loadStudentReservationsIfNeededAction = createAction(
  '[RESERVATIONS] Load student reservations if needed',
  props<{ studentId: string, key: string }>()
);
export const loadReservationForIdAction = createAction(
  '[RESERVATIONS] Load reservation for id',
  props<{ id: string }>()
);
export const loadReservationForIdIfNeededAction = createAction(
  '[RESERVATIONS] Load reservation for id if needed',
  props<{ id: string }>()
);


export const invalidateReservationsDataAction = createAction(
  '[RESERVATIONS] Invalidate reservations data',
  props<{ resourceType: ReservationsStateKey }>()
);

export const loadReservationsSuccessAction = createAction(
  '[RESERVATIONS] Load collection successful',
  props<{ resourceType: ReservationsStateKey, collection: ReservationsType[], key: string }>()
);
export const loadReservationSuccessAction = createAction(
  '[RESERVATIONS] Load instance successful',
  props<{ resourceType: ReservationsStateKey, instance: ReservationsType }>()
);

export const loadReservationsFailedAction = createAction(
  '[RESERVATIONS] Load failed',
  props<{ error: any }>()
);
