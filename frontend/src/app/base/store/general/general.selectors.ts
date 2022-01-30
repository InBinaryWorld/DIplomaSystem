import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralFeatureName } from './general.reducer';
import { GeneralResource, GeneralState } from './general.state';
import { AppState } from '../app-state.model';
import { GeneralResourceType } from '../../models/general-store-key.model';

export const selectGeneralState = createFeatureSelector<GeneralState>(GeneralFeatureName);
export const selectGeneralStateInProgress = createSelector(selectGeneralState, state => state.isInProgress);
export const selectGeneralStateError = createSelector(selectGeneralState, state => state.error);
export const selectGeneralResourceForKey = createSelector<AppState, GeneralResourceType, GeneralState, GeneralResource<any>>(
  selectGeneralState, (genRes, resourceType) => genRes[resourceType]
);
export const selectResourcesById = createSelector(
  selectGeneralResourceForKey, (genResource) => genResource.resourcesById
);
export const selectAreAllResourcesLoaded = createSelector(
  selectGeneralResourceForKey, (genResource) => genResource.allFetched
);
