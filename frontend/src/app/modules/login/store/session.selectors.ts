import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionFeatureName } from './session.reducer';
import { SessionState } from '../models/session-state.model';
import { isNotNil } from "../../../core/base/isNotNil";

export const selectSessionStateState = createFeatureSelector<SessionState>(SessionFeatureName);
export const selectContextRole = createSelector(selectSessionStateState, state => state.contextRole);
export const selectSessionActionInProgress = createSelector(selectSessionStateState, state => state.isInProgress);
export const selectSessionError = createSelector(selectSessionStateState, state => state.error);
export const selectSession = createSelector(selectSessionStateState, state => state.sessionData);
export const selectIsLoggedIn = createSelector(selectSession, session => isNotNil(session));
