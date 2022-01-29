import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestsFeatureName } from './requests.reducer';
import { RequestsState, RequestsStateByKey } from './requests.state';
import { AppState } from '../app-state.model';
import { Dictionary } from '../../../core/models/dictionary.model';

export const selectRequestsState = createFeatureSelector<RequestsState>(RequestsFeatureName);
export const selectRequestsStateInProgress = createSelector(selectRequestsState, state => state.isInProgress);
export const selectRequestsStateError = createSelector(selectRequestsState, state => state.error);
export const selectClarificationRequestsMap = createSelector(selectRequestsState, state => state.stateByKey);
export const selectClarificationRequests = createSelector<AppState, string, Dictionary<RequestsStateByKey>, RequestsStateByKey>(
  selectClarificationRequestsMap, (reqById, key) => reqById[key]
);
