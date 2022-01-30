import { createAction, props } from '@ngrx/store';
import { WithId } from '../../models/dto/id.model';
import { GeneralStoreType } from './general.state';

export const loadGeneralResourcesAction = createAction(
  '[GENERAL] Load general resources',
  props<{ resourceType: GeneralStoreType }>()
);
export const loadGeneralResourcesIfNeededAction = createAction(
  '[GENERAL] Load general resources if needed',
  props<{ resourceType: GeneralStoreType }>()
);
export const loadGeneralResourceForIdAction = createAction(
  '[GENERAL] Load general resource for id',
  props<{ resourceType: GeneralStoreType, id: string }>()
);
export const loadGeneralResourceForIdIfNeededAction = createAction(
  '[GENERAL] Load general resource for id if needed',
  props<{ resourceType: GeneralStoreType, id: string }>()
);
export const invalidateGeneralResourcesAction = createAction(
  '[GENERAL] Invalidate general resources'
);
export const loadGeneralResourcesSuccessAction = createAction(
  '[GENERAL]  Load general resources successful',
  props<{ resources: WithId[], resourceType: GeneralStoreType }>()
);
export const loadGeneralResourceSuccessAction = createAction(
  '[GENERAL]  Load general resource successful',
  props<{ resource: WithId, resourceType: GeneralStoreType }>()
);
export const loadGeneralResourcesFailedAction = createAction(
  '[GENERAL] Load general resources failed',
  props<{ error: any, resourceType: GeneralStoreType }>()
);
