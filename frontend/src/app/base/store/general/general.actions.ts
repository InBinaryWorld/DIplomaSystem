import { createAction, props } from '@ngrx/store';
import { GeneralResourcesStateKey, GeneralResourceType } from './general.state';

export const loadGeneralResourcesAction = createAction(
  '[GENERAL] Load general resources',
  props<{ resourceType: GeneralResourcesStateKey, key: string }>()
);
export const loadGeneralResourcesIfNeededAction = createAction(
  '[GENERAL] Load general resources if needed',
  props<{ resourceType: GeneralResourcesStateKey, key: string }>()
);
export const loadGeneralResourceForIdAction = createAction(
  '[GENERAL] Load general resource for id',
  props<{ resourceType: GeneralResourcesStateKey, id: string }>()
);
export const loadGeneralResourceForIdIfNeededAction = createAction(
  '[GENERAL] Load general resource for id if needed',
  props<{ resourceType: GeneralResourcesStateKey, id: string }>()
);

export const invalidateGeneralResourcesAction = createAction(
  '[GENERAL] Invalidate store resource',
  props<{ resourceType: GeneralResourcesStateKey }>()
);


export const loadGeneralResourcesSuccessAction = createAction(
  '[GENERAL]  Load collection successful',
  props<{ resourceType: GeneralResourcesStateKey, collection: GeneralResourceType[], key: string }>()
);
export const loadGeneralResourceSuccessAction = createAction(
  '[GENERAL]  Load instance successful',
  props<{ resourceType: GeneralResourcesStateKey, instance: GeneralResourceType }>()
);

export const loadGeneralResourcesFailedAction = createAction(
  '[GENERAL] Load failed',
  props<{ error: any }>()
);
