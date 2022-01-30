import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import {
  loadClarificationRequestsAction,
  loadClarificationRequestsFailedAction,
  loadClarificationRequestsIfNeededAction,
  loadClarificationRequestsSuccessAction
} from './requests.actions';
import { selectClarificationRequests } from './requests.selectors';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import { RequestsApiService } from '../../services/api/requests-api.service';


@Injectable()
export class RequestsEffects {

  loadClarificationRequestsIfNeeded = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsIfNeededAction),
    mergeIfNil(({ key }) => this.store.select(selectClarificationRequests, key)),
    map(({ userRole, key }) => loadClarificationRequestsAction({ userRole, key }))
  ));

  loadClarificationRequests = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsAction),
    mergeMap(({ userRole, key }) => this.requestsService.getClarificationRequestsForRole(userRole).pipe(
      map(requests => loadClarificationRequestsSuccessAction({ requests, key })),
      catchError(error => of(loadClarificationRequestsFailedAction({ error, key })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly requestsService: RequestsApiService) {
  }

}
