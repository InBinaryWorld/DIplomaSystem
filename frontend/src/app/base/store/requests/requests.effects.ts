import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
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
import { switchIfNotNil } from '../../../core/tools/If-needed-only-functions';
import { RequestsService } from '../../services/requests.service';


@Injectable()
export class requestsEffects {

  loadClarificationRequestsIfNeeded = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsIfNeededAction),
    switchIfNotNil(({ key }) => this.store.select(selectClarificationRequests, key)),
    map(({ role, roleId, key }) => loadClarificationRequestsAction({ role, roleId, key }))
  ));

  loadClarificationRequests = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsAction),
    switchMap(({ role, roleId, key }) => this.requestsService.getClarificationRequestsForRole(role, roleId).pipe(
      map(clarificationRequests => loadClarificationRequestsSuccessAction({ requests: clarificationRequests, key })),
      catchError(error => of(loadClarificationRequestsFailedAction({ error, key })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly requestsService: RequestsService) {
  }

}
