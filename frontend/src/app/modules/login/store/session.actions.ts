import { createAction, props } from '@ngrx/store';
import { LoginData } from '../models/login-data.model';
import { SessionData } from '../models/session-data.model';
import { UserRole } from "../models/user-role.model";


export const loginAction = createAction('[SESSION] Login', props<{ loginData: LoginData }>());
export const loginSuccessAction = createAction('[SESSION] Login success', props<{ sessionData: SessionData }>());
export const loginFailedAction = createAction('[SESSION] session failed', props<{ error: any }>());

export const setContextRole = createAction('[SESSION] SET USER ROLE', props<{ contextRole?: UserRole }>());
export const logoutAction = createAction('[SESSION] Logout');
