import { createAction, props } from '@ngrx/store';
import { GeneralResourceType } from '../../models/general-store-key.model';
import { WithId } from '../../models/dto/id.model';

export const loadGeneralResourcesAction = createAction(
  '[GENERAL] Load general resources',
  props<{ resourceType: GeneralResourceType }>()
);
export const loadGeneralResourcesIfNeededAction = createAction(
  '[GENERAL] Load general resources if needed',
  props<{ resourceType: GeneralResourceType }>()
);
export const loadGeneralResourceForIdAction = createAction(
  '[GENERAL] Load general resource for id',
  props<{ resourceType: GeneralResourceType, id: string }>()
);
export const loadGeneralResourceForIdIfNeededAction = createAction(
  '[GENERAL] Load general resource for id if needed',
  props<{ resourceType: GeneralResourceType, id: string }>()
);
export const invalidateGeneralResourcesAction = createAction(
  '[GENERAL] Invalidate general resources'
);
export const loadGeneralResourcesSuccessAction = createAction(
  '[GENERAL]  Load general resources successful',
  props<{ resources: WithId[], resourceType: GeneralResourceType }>()
);
export const loadGeneralResourceSuccessAction = createAction(
  '[GENERAL]  Load general resource successful',
  props<{ resource: WithId, resourceType: GeneralResourceType }>()
);
export const loadGeneralResourcesFailedAction = createAction(
  '[GENERAL] Load general resources failed',
  props<{ error: any, resourceType: GeneralResourceType }>()
);
