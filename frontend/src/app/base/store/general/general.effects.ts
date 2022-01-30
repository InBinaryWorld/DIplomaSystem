import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { selectGeneralResourceIdsForTypeAndKey, selectGeneralResourcesForTypeAndId } from './general.selectors';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import {
  loadGeneralResourceForIdAction,
  loadGeneralResourceForIdIfNeededAction,
  loadGeneralResourcesAction,
  loadGeneralResourcesFailedAction,
  loadGeneralResourcesIfNeededAction,
  loadGeneralResourcesSuccessAction,
  loadGeneralResourceSuccessAction
} from './general.actions';
import { GeneralResourcesApiService } from '../../services/api/general-api.service';


@Injectable()
export class GeneralResourcesEffects {


  loadGeneralResourcesIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourcesIfNeededAction),
    mergeIfNil(({ resourceType, key }) =>
      this.store.select(selectGeneralResourceIdsForTypeAndKey, { resourceType, key })),
    map(({ resourceType, key }) => loadGeneralResourcesAction({ resourceType, key }))
  ));

  loadGeneralResourcesAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourcesAction),
    mergeMap(({ resourceType, key }) =>
      this.generalResourcesService.getResourcesForType(resourceType).pipe(
        map(collection => loadGeneralResourcesSuccessAction({ resourceType, collection, key })),
        catchError(error => of(loadGeneralResourcesFailedAction({ error })))
      ))
  ));

  loadGeneralResourceForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourceForIdIfNeededAction),
    mergeIfNil(({ resourceType, id }) => this.store.select(selectGeneralResourcesForTypeAndId, { resourceType, id })),
    map(({ resourceType, id }) => loadGeneralResourceForIdAction({ resourceType, id }))
  ));

  loadGeneralResourceForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadGeneralResourceForIdAction),
    mergeMap(({ resourceType, id }) => this.generalResourcesService.getResourceForId(resourceType, id).pipe(
      map(instance => loadGeneralResourceSuccessAction({ resourceType, instance })),
      catchError(error => of(loadGeneralResourcesFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly generalResourcesService: GeneralResourcesApiService) {
  }

}
