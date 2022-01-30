import { createAction, props } from '@ngrx/store';
import { UserRole } from '../../models/dto/user-role.model';
import { RequestsStoreType, RequestStoreResourceType } from './requests.state';

export const loadClarificationRequestsAction = createAction(
  '[REQUESTS] Load clarification requests',
  props<{ userRole: UserRole, key: string }>()
);
export const loadClarificationRequestsIfNeededAction = createAction(
  '[REQUESTS] Load clarification requests if needed',
  props<{ userRole: UserRole, key: string }>()
);
export const loadClarificationRequestsForIdAction = createAction(
  '[REQUESTS] Load clarification requests for id',
  props<{ userRole: UserRole, id: string }>()
);
export const loadClarificationRequestsForIdIfNeededAction = createAction(
  '[REQUESTS] Load clarification requests for id if needed',
  props<{ userRole: UserRole, id: string }>()
);

export const loadChangeRequestsAction = createAction(
  '[REQUESTS] Load change requests',
  props<{ userRole: UserRole, key: string }>()
);
export const loadChangeRequestsIfNeededAction = createAction(
  '[REQUESTS] Load change requests if needed',
  props<{ userRole: UserRole, key: string }>()
);
export const loadChangeRequestsForIdAction = createAction(
  '[REQUESTS] Load change requests for id',
  props<{ userRole: UserRole, id: string }>()
);
export const loadChangeRequestsForIdIfNeededAction = createAction(
  '[REQUESTS] Load change requests for id if needed',
  props<{ userRole: UserRole, id: string }>()
);


export const invalidateRequestsDataAction = createAction(
  '[REQUESTS] Invalidate requests data',
  props<{ resourceType: RequestsStoreType }>()
);

export const loadRequestsSuccessAction = createAction(
  '[REQUESTS] Load requests successful',
  props<{ resourceType: RequestsStoreType, collection: RequestStoreResourceType[], key: string }>()
);
export const loadRequestSuccessAction = createAction(
  '[REQUESTS] Load request successful',
  props<{ resourceType: RequestsStoreType, instance: RequestStoreResourceType }>()
);

export const loadRequestsFailedAction = createAction(
  '[REQUESTS] Load requests failed',
  props<{ error: any }>()
);
