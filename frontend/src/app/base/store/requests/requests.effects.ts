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
import { switchIfNil } from '../../../core/tools/If-needed-only-functions';
import { RequestsService } from '../../services/requests.service';


@Injectable()
export class requestsEffects {

  loadClarificationRequestsIfNeeded = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsIfNeededAction),
    switchIfNil(({ key }) => this.store.select(selectClarificationRequests, key)),
    map(({ userRole, key }) => loadClarificationRequestsAction({ userRole, key }))
  ));

  loadClarificationRequests = createEffect(() => this.actions.pipe(
    ofType(loadClarificationRequestsAction),
    switchMap(({ userRole, key }) => this.requestsService.getClarificationRequestsForRole(userRole).pipe(
      map(clarificationRequests => loadClarificationRequestsSuccessAction({ requests: clarificationRequests, key })),
      catchError(error => of(loadClarificationRequestsFailedAction({ error, key })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly requestsService: RequestsService) {
  }

}
