import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionService } from '../services/session.service';
import {
  loginAction,
  loginFailedAction,
  loginSuccessAction,
  logoutAction,
  logoutFailedAction,
  logoutSuccessAction
} from './session.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SessionEffects {

  login = createEffect(() => this.actions.pipe(
    ofType(loginAction),
    tap(action => console.log(action)),
    switchMap(action => this.sessionService.login(action.loginData).pipe(
      map(SessionData => loginSuccessAction({ sessionData: SessionData })),
      catchError(error => of(loginFailedAction({ error })))
    ))
  ));

  logout = createEffect(() => this.actions.pipe(
    ofType(logoutAction),
    switchMap(() => this.sessionService.logout().pipe(
      map(() => logoutSuccessAction()),
      catchError(error => of(logoutFailedAction({ error })))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly sessionService: SessionService) {
  }

}
