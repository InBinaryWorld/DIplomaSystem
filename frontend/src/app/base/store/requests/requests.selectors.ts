import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestsFeatureName } from './requests.reducer';
import { RequestsState, RequestsStateKey, RequestType } from './requests.state';
import { AppState } from '../app-state.model';
import { forIdSelector, forKeySelector, StoreResource } from '../../../core/store/base-store-state.model';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';

export const selectRequestsState = createFeatureSelector<RequestsState>(RequestsFeatureName);
export const selectRequestsStateInProgress = createSelector(selectRequestsState, state => state.isInProgress);
export const selectRequestsStateError = createSelector(selectRequestsState, state => state.error);

export const selectClarificationRequestsStoreResource = createSelector(selectRequestsState, state => state[RequestsStateKey.CLARIFICATION]);
export const selectClarificationRequestsForKey = createSelector<AppState, string, StoreResource<ClarificationRequest>, ClarificationRequest[] | undefined>(
  selectClarificationRequestsStoreResource, forKeySelector
);
export const selectClarificationRequestForId = createSelector<AppState, string, StoreResource<ClarificationRequest>, ClarificationRequest | undefined>(
  selectClarificationRequestsStoreResource, forIdSelector
);

export const selectChangeRequestsStoreResource = createSelector(selectRequestsState, state => state[RequestsStateKey.CHANGE]);
export const selectChangeRequestsForKey = createSelector<AppState, string, StoreResource<ChangeRequest>, ChangeRequest[] | undefined>(
  selectChangeRequestsStoreResource, forKeySelector
);
export const selectChangeRequestForId = createSelector<AppState, string, StoreResource<ChangeRequest>, ChangeRequest | undefined>(
  selectChangeRequestsStoreResource, forIdSelector
);


// For Effect
export const selectRequestForTypeAndId = createSelector<AppState, { resourceType: RequestsStateKey, id: string }, RequestsState, RequestType | undefined>(
  selectRequestsState, (state, { resourceType, id }) => state[resourceType].cachedById[id]
);
export const selectRequestsIdsForTypeAndKey = createSelector<AppState, { resourceType: RequestsStateKey, key: string }, RequestsState, string[] | undefined>(
  selectRequestsState, (state, { resourceType, key }) => state[resourceType].idsByKey[key]
);