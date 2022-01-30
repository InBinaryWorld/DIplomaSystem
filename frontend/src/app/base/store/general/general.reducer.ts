import { createReducer, on } from '@ngrx/store';
import {
  failedReducer,
  resourceInvalidateReducer,
  resourcesSuccessReducer,
  resourceSuccessReducer,
  startProgressReducer
} from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { GeneralState } from './general.state';
import {
  invalidateGeneralResourcesAction,
  loadGeneralResourceForIdAction,
  loadGeneralResourcesAction,
  loadGeneralResourcesFailedAction,
  loadGeneralResourcesSuccessAction,
  loadGeneralResourceSuccessAction
} from './general.actions';

export const GeneralFeatureName = 'general';

export const initialState = new GeneralState();

export const generalResourcesReducer = createReducer(
  initialState,
  on(loadGeneralResourcesAction, startProgressReducer()),
  on(loadGeneralResourceForIdAction, startProgressReducer()),
  on(loadGeneralResourcesFailedAction, failedReducer()),
  on(loadGeneralResourceSuccessAction, resourceSuccessReducer()),
  on(loadGeneralResourcesSuccessAction, resourcesSuccessReducer()),
  on(invalidateGeneralResourcesAction, resourceInvalidateReducer()),
  on(clearStoreAction, () => initialState)
);
