import { createReducer, on } from '@ngrx/store';
import { failedReducerFn, startProgressReducer, successReducerFn } from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { GeneralResource, GeneralState, GeneralStoreType } from './general.state';
import {
  invalidateGeneralResourcesAction,
  loadGeneralResourceForIdAction,
  loadGeneralResourcesAction,
  loadGeneralResourcesFailedAction,
  loadGeneralResourcesSuccessAction,
  loadGeneralResourceSuccessAction
} from './general.actions';
import { isNotNil } from '../../../core/tools/is-not-nil';
import { WithId } from '../../models/dto/id.model';

export const GeneralFeatureName = 'general';

export const initialState = new GeneralState();

export const generalResourcesReducer = createReducer(
  initialState,
  on(loadGeneralResourcesAction, startProgressReducer()),
  on(loadGeneralResourceForIdAction, startProgressReducer()),
  on(loadGeneralResourcesFailedAction,
    (state, { error, resourceType }) => failedReducerFn(state, error, setResources(resourceType))),
  on(loadGeneralResourcesSuccessAction,
    (state, { resourceType, resources }) => successReducerFn(state, setResources(resourceType, resources))),
  on(loadGeneralResourceSuccessAction,
    (state, { resourceType, resource }) => successReducerFn(state, setResource(state, resourceType, resource))),
  on(invalidateGeneralResourcesAction, () => initialState),
  on(clearStoreAction, () => initialState)
);


function setResources(resourceType: GeneralStoreType, resources?: WithId[]): Partial<GeneralState> {
  const genResource = isNotNil(resources)
    ? GeneralResource.forAll(resources!)
    : new GeneralResource();
  return { [resourceType]: genResource };
}

function setResource(state: GeneralState, resourceType: GeneralStoreType, resource: WithId): Partial<GeneralState> {
  const currentGenResource = state[resourceType];
  const newGenResource = new GeneralResource();
  newGenResource.allFetched = currentGenResource.allFetched;
  newGenResource.resourcesById = { ...currentGenResource.resourcesById, [resource.id]: resource };
  return { [resourceType]: newGenResource };
}
