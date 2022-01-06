import { createAction, props } from '@ngrx/store';
import { LoginData } from '../models/login-data.model';
import { SessionData } from '../models/session-data.model';


export const loginAction = createAction('[SESSION] Login', props<{ loginData: LoginData }>());
export const loginSuccessAction = createAction('[SESSION] Login success', props<{ sessionData: SessionData }>());
export const loginFailedAction = createAction('[SESSION] session failed', props<{ error: any }>());

export const logoutAction = createAction('[SESSION] Logout');
export const logoutSuccessAction = createAction('[SESSION] Logout success');
export const logoutFailedAction = createAction('[SESSION] logout failed', props<{ error: any }>());
