import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { selectAreAllResourcesLoaded, selectResourcesById } from './general.selectors';
import { mergeIf } from '../../../core/tools/If-needed-only-functions';
import {
  loadGeneralResourceForIdAction,
  loadGeneralResourceForIdIfNeededAction,
  loadGeneralResourcesAction,
  loadGeneralResourcesFailedAction,
  loadGeneralResourcesIfNeededAction,
  loadGeneralResourcesSuccessAction,
  loadGeneralResourceSuccessAction
} from './general.actions';
import { GeneralResourcesApiService } from '../../services/api/general-resources-api.service';
import { isNil } from 'lodash-es';


@Injectable()
export class GeneralResourcesEffects {

  loadGeneralResourcesIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourcesIfNeededAction),
    mergeIf(({ resourceType }) => this.store.select(selectAreAllResourcesLoaded, resourceType), v => !v),
    map(({ resourceType }) => loadGeneralResourcesAction({ resourceType }))
  ));

  loadGeneralResourcesAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourcesAction),
    switchMap(({ resourceType }) => this.generalResourcesService.getAllResourcesForType(resourceType).pipe(
      map(resources => loadGeneralResourcesSuccessAction({ resources, resourceType })),
      catchError(error => of(loadGeneralResourcesFailedAction({ error, resourceType })))
    ))
  ));

  loadGeneralResourceForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourceForIdIfNeededAction),
    mergeIf(({ resourceType, id }) =>
      this.store.select(selectResourcesById, resourceType), (dict, { id }) => isNil(dict[id])),
    map(({ resourceType, id }) => loadGeneralResourceForIdAction({ resourceType, id }))
  ));

  loadGeneralResourceForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourceForIdAction),
    switchMap(({ resourceType, id }) => this.generalResourcesService.getResourceForTypeAndId(resourceType, id).pipe(
      map(resource => loadGeneralResourceSuccessAction({ resource, resourceType })),
      catchError(error => of(loadGeneralResourcesFailedAction({ error, resourceType })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly generalResourcesService: GeneralResourcesApiService) {
  }

}
