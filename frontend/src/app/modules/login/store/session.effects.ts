import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionService } from '../services/session.service';
import { loginAction, loginFailedAction, loginSuccessAction, logoutAction, setContextRole } from './session.actions';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { firstItem } from "../../../core/base/first-item";
import { ContextRoutingService } from "../../../core/services/context-routing.service";

@Injectable()
export class SessionEffects {

  login = createEffect(() => this.actions.pipe(
    ofType(loginAction),
    switchMap(action => this.sessionService.login(action.loginData).pipe(
      mergeMap(sessionData => [
        setContextRole({ contextRole: firstItem(sessionData.roles)! }),
        loginSuccessAction({ sessionData })
      ]),
      catchError(error => of(loginFailedAction(error)))
    ))
  ));

  setRole = createEffect(() => this.actions.pipe(
    ofType(setContextRole),
    tap(() => this.contextRoutingService.navigateToPageByContext())
  ), { dispatch: false })

  logout = createEffect(() => this.actions.pipe(
    ofType(logoutAction),
    tap(() => this.contextRoutingService.navigateToPageByContext())
  ), { dispatch: false });

  constructor(private readonly actions: Actions,
              private readonly sessionService: SessionService,
              private readonly contextRoutingService: ContextRoutingService) {
  }

}
