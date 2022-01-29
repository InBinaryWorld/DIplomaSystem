import { createReducer, on } from '@ngrx/store';
import { loginAction, loginFailedAction, loginSuccessAction, refreshTokenAction } from './auth.actions';
import { AuthState } from './auth.state';
import { failedReducer, startProgressReducer, successReducerFn } from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';

export const AuthFeatureName = 'auth';

export const initialState = new AuthState();

export const authReducer = createReducer(
  initialState,
  on(loginAction, startProgressReducer()),
  on(refreshTokenAction, startProgressReducer()),
  on(loginFailedAction, failedReducer()),
  on(loginSuccessAction, (state, { authData }) => successReducerFn(state, { authData })),
  on(clearStoreAction, () => initialState)
);
