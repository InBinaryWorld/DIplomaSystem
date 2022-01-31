import { createReducer, on } from '@ngrx/store';
import {
  failedReducer,
  resourceInvalidateReducer,
  resourcesSuccessReducer,
  resourceSuccessReducer,
  startProgressReducer
} from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { ThesesState } from './theses.state';
import {
  invalidateThesesDataAction,
  loadReservationForIdAction,
  loadStudentReservationsAction,
  loadThesesAction,
  loadThesesFailedAction,
  loadThesesSuccessAction,
  loadThesisForIdAction,
  loadThesisSuccessAction
} from './theses.actions';

export const thesesFeatureName = 'theses';

export const initialState = new ThesesState();

export const thesesReducer = createReducer(
  initialState,
  on(loadStudentReservationsAction, startProgressReducer()),
  on(loadReservationForIdAction, startProgressReducer()),
  on(loadThesesAction, startProgressReducer()),
  on(loadThesisForIdAction, startProgressReducer()),
  on(loadThesesFailedAction, failedReducer()),
  on(loadThesisSuccessAction, resourceSuccessReducer()),
  on(loadThesesSuccessAction, resourcesSuccessReducer()),
  on(invalidateThesesDataAction, resourceInvalidateReducer()),
  on(clearStoreAction, () => initialState)
);
