import { createAction, props } from '@ngrx/store';
import { User } from '../../models/dto/user.model';
import { IfNeededOnlyPayload } from '../../../core/store/if-needed-payload.model';


export const loadCurrentUserAction = createAction('[USER] Load current user', props<IfNeededOnlyPayload>());
export const invalidateCurrentUserAction = createAction('[USER] Invalidate current user');
export const loadCurrentUserSuccessAction = createAction('[USER] Load current user successful', props<{ user: User }>());
export const loadCurrentUserFailedAction = createAction('[USER] Load current user failed', props<{ error: any }>());
