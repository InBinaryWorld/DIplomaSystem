import { createAction, props } from '@ngrx/store';
import { ThesesStateKey, ThesesStoreType } from './theses.state';
import { UserRole } from '../../models/dto/user-role.model';

export const loadStudentReservationsAction = createAction(
  '[THESES] Load student reservations',
  props<{ studentId: string, key: string }>()
);
export const loadStudentReservationsIfNeededAction = createAction(
  '[THESES] Load student reservations if needed',
  props<{ studentId: string, key: string }>()
);
export const loadReservationForIdAction = createAction(
  '[THESES] Load reservation for id',
  props<{ id: string }>()
);
export const loadReservationForIdIfNeededAction = createAction(
  '[THESES] Load reservation for id if needed',
  props<{ id: string }>()
);


export const loadThesesAction = createAction(
  '[THESES] Load theses',
  props<{ userRole: UserRole, key: string }>()
);
export const loadThesesIfNeededAction = createAction(
  '[THESES] Load theses if needed',
  props<{ userRole: UserRole, key: string }>()
);
export const loadThesisForIdAction = createAction(
  '[THESES] Load thesis for id',
  props<{ id: string }>()
);
export const loadThesisForIdIfNeededAction = createAction(
  '[THESES] Load thesis for id if needed',
  props<{ id: string }>()
);


export const invalidateThesesDataAction = createAction(
  '[THESES] Invalidate store resource',
  props<{ resourceType: ThesesStateKey }>()
);

export const loadThesesSuccessAction = createAction(
  '[THESES] Load collection successful',
  props<{ resourceType: ThesesStateKey, collection: ThesesStoreType[], key: string }>()
);
export const loadThesisSuccessAction = createAction(
  '[THESES] Load instance successful',
  props<{ resourceType: ThesesStateKey, instance: ThesesStoreType }>()
);

export const loadThesesFailedAction = createAction(
  '[THESES] Load failed',
  props<{ error: any }>()
);
