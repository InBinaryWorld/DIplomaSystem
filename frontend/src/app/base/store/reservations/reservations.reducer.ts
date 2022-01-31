import { createReducer, on } from '@ngrx/store';
import {
  failedReducer,
  resourceInvalidateReducer,
  resourcesSuccessReducer,
  resourceSuccessReducer,
  startProgressReducer
} from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { ReservationsState } from './reservations.state';
import {
  invalidateReservationsDataAction,
  loadReservationForIdAction,
  loadReservationsFailedAction,
  loadReservationsSuccessAction,
  loadReservationSuccessAction,
  loadStudentReservationsAction
} from './reservations.actions';

export const ReservationsFeatureName = 'reservation';

export const initialState = new ReservationsState();

export const reservationsReducer = createReducer(
  initialState,
  on(loadStudentReservationsAction, startProgressReducer()),
  on(loadReservationForIdAction, startProgressReducer()),
  on(loadReservationsFailedAction, failedReducer()),
  on(loadReservationSuccessAction, resourceSuccessReducer()),
  on(loadReservationsSuccessAction, resourcesSuccessReducer()),
  on(invalidateReservationsDataAction, resourceInvalidateReducer()),
  on(clearStoreAction, () => initialState)
);
