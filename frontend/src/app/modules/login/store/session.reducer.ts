import { createReducer, on } from '@ngrx/store';
import { loginAction, loginFailedAction, loginSuccessAction, logoutAction, setContextRole } from './session.actions';
import { SessionState } from '../models/session-state.model';
import { failedReducer, successReducer } from "../../../core/store/base-store-state.model";

export const SessionFeatureName = 'session';

export const initialState = new SessionState();

export const sessionReducer = createReducer(
  initialState,
  on(loginAction, (state) => ({ ...state, isInProgress: true })),
  on(loginSuccessAction, (state, { sessionData }) => successReducer(state, { sessionData })),
  on(setContextRole, (state, { contextRole }) => successReducer(state, { contextRole })),
  on(loginFailedAction, (state, { error }) => failedReducer(state, error)),
  on(logoutAction, (state) => successReducer(state, { sessionData: undefined, contextRole: undefined }))
);
