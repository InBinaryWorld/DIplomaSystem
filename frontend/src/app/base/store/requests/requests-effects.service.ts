import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  loadChangeRequestsAction,
  loadChangeRequestsForIdAction,
  loadChangeRequestsForIdIfNeededAction,
  loadChangeRequestsIfNeededAction,
  loadClarificationRequestsAction,
  loadClarificationRequestsForIdAction,
  loadClarificationRequestsForIdIfNeededAction,
  loadClarificationRequestsIfNeededAction,
  loadRequestsFailedAction,
  loadRequestsSuccessAction,
  loadRequestSuccessAction
} from './requests.actions';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import { RequestsApiService } from '../../services/api/requests-api.service';
import {
  selectChangeRequestForId,
  selectChangeRequestsForKey,
  selectClarificationRequestForId,
  selectClarificationRequestsForKey
} from './requests.selectors';
import { RequestsStoreType } from './requests.state';


@Injectable()
export class RequestsEffects {

  loadClarificationRequestsIfNeeded = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsIfNeededAction),
    mergeIfNil(({ key, userRole }) => this.store.select(selectClarificationRequestsForKey, key)),
    map(({ userRole, key }) => loadClarificationRequestsAction({ userRole, key }))
  ));

  loadClarificationRequests = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsAction),
    mergeMap(({ userRole, key }) => this.requestsService.getClarificationRequestsForRole(userRole).pipe(
      map(collection => loadRequestsSuccessAction(
        { resourceType: RequestsStoreType.CLARIFICATION, collection, key }
      )),
      catchError(error => of(loadRequestsFailedAction({ error })))
    ))
  ));

  loadClarificationRequestsForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsForIdIfNeededAction),
    mergeIfNil(({ userRole, id }) => this.store.select(selectClarificationRequestForId, id)),
    map(({ userRole, id }) => loadClarificationRequestsForIdAction({ userRole, id }))
  ));

  loadClarificationRequestsForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsForIdAction),
    mergeMap(({ userRole, id }) => this.requestsService.getClarificationRequestForId(id).pipe(
      map(instance => loadRequestSuccessAction({ resourceType: RequestsStoreType.CLARIFICATION, instance })),
      catchError(error => of(loadRequestsFailedAction({ error })))
    ))
  ));

  loadChangeRequestsIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestsIfNeededAction),
    mergeIfNil(({ key }) => this.store.select(selectChangeRequestsForKey, key)),
    map(({ userRole, key }) => loadChangeRequestsAction({ userRole, key }))
  ));

  loadChangeRequestsAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestsAction),
    mergeMap(({ userRole, key }) => this.requestsService.getChangeRequestsForRole(userRole).pipe(
      map(collection => loadRequestsSuccessAction(
        { resourceType: RequestsStoreType.CHANGE, collection, key }
      )),
      catchError(error => of(loadRequestsFailedAction({ error })))
    ))
  ));

  loadChangeRequestsForIdIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestsForIdIfNeededAction),
    mergeIfNil(({ userRole, id }) => this.store.select(selectChangeRequestForId, id)),
    map(({ userRole, id }) => loadChangeRequestsForIdAction({ userRole, id }))
  ));

  loadChangeRequestsForIdAction = createEffect(() => this.actions.pipe(
    ofType(loadChangeRequestsForIdAction),
    mergeMap(({ userRole, id }) => this.requestsService.getChangeRequestForId(id).pipe(
      map(instance => loadRequestSuccessAction({ resourceType: RequestsStoreType.CHANGE, instance })),
      catchError(error => of(loadRequestsFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly requestsService: RequestsApiService) {
  }

}
