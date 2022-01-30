import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  loadRequestsAction,
  loadRequestsFailedAction,
  loadRequestsForIdAction,
  loadRequestsForIdIfNeededAction,
  loadRequestsIfNeededAction,
  loadRequestsSuccessAction,
  loadRequestSuccessAction
} from './requests.actions';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import { RequestsApiService } from '../../services/api/requests-api.service';
import { selectRequestForTypeAndId, selectRequestsIdsForTypeAndKey } from './requests.selectors';


@Injectable()
export class RequestsEffects {

  loadRequestsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadRequestsIfNeededAction),
    mergeIfNil(({ resourceType, key }) => this.store.select(selectRequestsIdsForTypeAndKey, { resourceType, key })),
    map(({ resourceType, userRole, key }) => loadRequestsAction({ resourceType, userRole, key }))
  ));

  loadRequestsAction = createEffect(() => this.actions.pipe(
    ofType(loadRequestsAction),
    mergeMap(({ resourceType, userRole, key }) =>
      this.requestsService.getRequestsForUserRole(resourceType, userRole).pipe(
        map(collection => loadRequestsSuccessAction({ resourceType, collection, key })),
        catchError(error => of(loadRequestsFailedAction({ error })))
      ))
  ));

  loadRequestsForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadRequestsForIdIfNeededAction),
    mergeIfNil(({ resourceType, id }) => this.store.select(selectRequestForTypeAndId, { resourceType, id })),
    map(({ resourceType, userRole, id }) => loadRequestsForIdAction({ resourceType, userRole, id }))
  ));

  loadRequestsForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadRequestsForIdAction),
    mergeMap(({ resourceType, userRole, id }) => this.requestsService.getRequestForId(resourceType, id).pipe(
      map(instance => loadRequestSuccessAction({ resourceType, instance })),
      catchError(error => of(loadRequestsFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly requestsService: RequestsApiService) {
  }

}
