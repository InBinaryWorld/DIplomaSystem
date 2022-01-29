import { createAction, props } from '@ngrx/store';
import { User } from '../../models/dto/user.model';


export const loadCurrentUserAction = createAction('[USER] Load current user');
export const loadCurrentUserIfNeededAction = createAction('[USER] Load current user if needed');
export const invalidateCurrentUserAction = createAction('[USER] Invalidate current user');
export const loadCurrentUserSuccessAction = createAction('[USER] Load current user successful', props<{ user: User }>());
export const loadCurrentUserFailedAction = createAction('[USER] Load current user failed', props<{ error: any }>());
