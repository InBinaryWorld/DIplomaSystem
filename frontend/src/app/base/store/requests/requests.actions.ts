import { createAction, props } from '@ngrx/store';
import { UserRole } from '../../models/dto/user-role.model';
import { RequestsStateKey, RequestType } from './requests.state';
import { IdType } from '../../models/dto/id.model';

export const loadRequestsAction = createAction(
  '[REQUESTS] Load requests',
  props<{ resourceType: RequestsStateKey, userRole: UserRole, key: string }>()
);
export const loadRequestsIfNeededAction = createAction(
  '[REQUESTS] Load requests if needed',
  props<{ resourceType: RequestsStateKey, userRole: UserRole, key: string }>()
);
export const loadRequestForIdAction = createAction(
  '[REQUESTS] Load request for id',
  props<{ resourceType: RequestsStateKey, userRole: UserRole, id: IdType }>()
);
export const loadRequestForIdIfNeededAction = createAction(
  '[REQUESTS] Load request for id if needed',
  props<{ resourceType: RequestsStateKey, userRole: UserRole, id: IdType }>()
);


export const invalidateRequestsDataAction = createAction(
  '[REQUESTS] Invalidate store resource',
  props<{ resourceType: RequestsStateKey }>()
);

export const loadRequestsSuccessAction = createAction(
  '[REQUESTS] Load collection successful',
  props<{ resourceType: RequestsStateKey, collection: RequestType[], key: string }>()
);
export const loadRequestSuccessAction = createAction(
  '[REQUESTS] Load instance successful',
  props<{ resourceType: RequestsStateKey, instance: RequestType }>()
);

export const loadRequestsFailedAction = createAction(
  '[REQUESTS] Load failed',
  props<{ error: any }>()
);
