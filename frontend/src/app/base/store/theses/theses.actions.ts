import { createAction, props } from '@ngrx/store';
import { ThesesStateKey, ThesesStoreType } from './theses.state';
import { IdType } from '../../models/dto/id.model';
import { ThesisStatus } from '../../models/dto/topic-status.model';

export const loadReservationsAction = createAction(
  '[THESES] Load reservations',
  props<{ options: LoadReservationsActionOptions, key: string }>()
);
export const loadStudentReservationsIfNeededAction = createAction(
  '[THESES] Load student reservations if needed',
  props<{ options: LoadReservationsActionOptions, key: string }>()
);
export const loadReservationForIdAction = createAction(
  '[THESES] Load reservation for id',
  props<{ id: IdType }>()
);
export const loadReservationForIdIfNeededAction = createAction(
  '[THESES] Load reservation for id if needed',
  props<{ id: IdType }>()
);


export const loadThesesAction = createAction(
  '[THESES] Load theses',
  props<{ options: LoadThesisActionOptions, key: string }>()
);
export const loadThesesIfNeededAction = createAction(
  '[THESES] Load theses if needed',
  props<{ options: LoadThesisActionOptions, key: string }>()
);
export const loadThesisForIdAction = createAction(
  '[THESES] Load thesis for id',
  props<{ id: IdType }>()
);
export const loadThesisForIdIfNeededAction = createAction(
  '[THESES] Load thesis for id if needed',
  props<{ id: IdType }>()
);


export const invalidateThesesDataAction = createAction(
  '[THESES] Invalidate store resource',
  props<{ resourceType: ThesesStateKey }>()
);

export const loadThesesStoreCollectionSuccessAction = createAction(
  '[THESES] Load collection successful',
  props<{ resourceType: ThesesStateKey, collection: ThesesStoreType[], key: string }>()
);
export const loadThesisStoreInstanceSuccessAction = createAction(
  '[THESES] Load instance successful',
  props<{ resourceType: ThesesStateKey, instance: ThesesStoreType }>()
);

export const loadThesesFailedAction = createAction(
  '[THESES] Load failed',
  props<{ error: any }>()
);

export class LoadReservationsActionOptions {
  studentId?: IdType;
  diplomaSessionId?: IdType;

  static for(studentId: IdType, diplomaSessionId: IdType): LoadReservationsActionOptions {
    const options = new LoadReservationsActionOptions();
    options.studentId = studentId;
    options.diplomaSessionId = diplomaSessionId;
    return options;
  }

  toKey(): string {
    return [
      'LoadReservationsActionOptions',
      'SI_' + this.studentId,
      'DSI_' + this.diplomaSessionId
    ].join('$');
  }
}


export class LoadThesisActionOptions {
  proposedByStudentId?: string;
  proposedByStudentOnly?: boolean;
  diplomaSessionId?: string;
  departmentId?: string;
  status?: string;

  static proposedByStudent(studentId: IdType): LoadThesisActionOptions {
    const options = new LoadThesisActionOptions();
    options.proposedByStudentId = studentId;
    options.proposedByStudentOnly = true;
    return options;
  }

  static forStatusAndDepartment(departmentId: IdType, status: ThesisStatus): LoadThesisActionOptions {
    const options = new LoadThesisActionOptions();
    options.departmentId = departmentId;
    options.status = status;
    return options;
  }

  static forStudent(studentId: IdType, diplomaSessionId: IdType, status: ThesisStatus): LoadThesisActionOptions {
    const options = new LoadThesisActionOptions();
    options.proposedByStudentId = studentId;
    options.diplomaSessionId = diplomaSessionId;
    options.status = status;
    return options;
  }

  toKey(): string {
    return [
      'LoadThesisActionOptions',
      'PBSI_' + this.proposedByStudentId,
      'PBSO_' + this.proposedByStudentOnly,
      'DSI_' + this.diplomaSessionId,
      'S_' + this.status
    ].join('$');
  }
}
