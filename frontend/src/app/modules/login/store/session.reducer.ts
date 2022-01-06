import { createReducer, on } from '@ngrx/store';
import {
  loginAction,
  loginFailedAction,
  loginSuccessAction,
  logoutAction,
  logoutFailedAction,
  logoutSuccessAction
} from './session.actions';
import { SessionState } from '../models/session-state.model';
import { failedReducer, successReducer } from "../../../core/store/base-store-state.model";

export const SessionFeatureName = 'session';

export const initialState = new SessionState();

export const sessionReducer = createReducer(
  initialState,
  on(loginAction, logoutAction, (state) => ({ ...state, isInProgress: true })),
  on(loginSuccessAction, (state, { sessionData }) => successReducer(state, { sessionData })),
  on(loginFailedAction, (state, { error }) => failedReducer(state, error)),
  on(logoutSuccessAction, (state) => successReducer(state, { sessionData: undefined })),
  on(logoutFailedAction, (state, { error }) => failedReducer(state, error, { sessionData: undefined }))
);
