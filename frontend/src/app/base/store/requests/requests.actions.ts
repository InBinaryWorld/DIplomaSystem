import { createAction, props } from '@ngrx/store';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { UserRole } from '../../models/dto/user-role.model';

export const loadClarificationRequestsAction = createAction(
  '[REQUESTS] Clarification requests',
  props<{ userRole: UserRole, key: string }>()
);
export const loadClarificationRequestsIfNeededAction = createAction(
  '[REQUESTS] Clarification requests if needed',
  props<{ userRole: UserRole, key: string }>()
);
export const invalidateRequestsDataAction = createAction(
  '[REQUESTS] Invalidate requests data',
  props<{ key: string }>()
);
export const loadClarificationRequestsSuccessAction = createAction(
  '[REQUESTS] Load clarification requests successful',
  props<{ requests: ClarificationRequest[], key: string }>()
);
export const loadClarificationRequestsFailedAction = createAction(
  '[REQUESTS] Load clarification requests failed',
  props<{ error: any, key: string }>()
);
