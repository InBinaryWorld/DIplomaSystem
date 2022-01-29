import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserFeatureName } from './user.reducer';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>(UserFeatureName);
export const selectUserStateInProgress = createSelector(selectUserState, state => state.isInProgress);
export const selectUserStateError = createSelector(selectUserState, state => state.error);
export const selectCurrentUser = createSelector(selectUserState, state => state.currentUser);
