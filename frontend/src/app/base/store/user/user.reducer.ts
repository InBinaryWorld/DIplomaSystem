import { createReducer, on } from '@ngrx/store';
import {
  invalidateCurrentUserAction,
  loadCurrentUserAction,
  loadCurrentUserFailedAction,
  loadCurrentUserSuccessAction
} from './user.actions';
import { failedReducer, startProgressReducer, successReducerFn } from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { UserState } from './user.state';

export const UserFeatureName = 'user';

export const initialState = new UserState();

export const userReducer = createReducer(
  initialState,
  on(loadCurrentUserAction, startProgressReducer()),
  on(loadCurrentUserFailedAction, failedReducer()),
  on(loadCurrentUserSuccessAction, (state, { user }) => successReducerFn(state, { currentUser: user })),
  on(invalidateCurrentUserAction, (state) => successReducerFn(state, { currentUser: undefined })),
  on(clearStoreAction, () => initialState)
);
