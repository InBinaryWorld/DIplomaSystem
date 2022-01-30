import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginAction, loginFailedAction, loginSuccessAction, logoutAction, refreshTokenAction } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthApiService } from '../../services/api/auth-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { selectAuthData } from './auth.selectors';

@Injectable()
export class AuthEffects {

  login = createEffect(() => this.actions.pipe(
    ofType(loginAction),
    switchMap(action => this.authService.login(action.loginData).pipe(
      map(sessionData => loginSuccessAction({ authData: sessionData })),
      catchError(error => of(loginFailedAction(error)))
    ))
  ));

  refresh = createEffect(() => this.actions.pipe(
    ofType(refreshTokenAction),
    switchMap(() => this.store.select(selectAuthData)),
    switchMap(authData => !authData
      ? of(logoutAction())
      : this.authService.refreshToken(authData!.refreshToken).pipe(
        map(sessionData => loginSuccessAction({ authData: sessionData })),
        catchError(() => of(logoutAction())
        ))
    )
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly authService: AuthApiService) {
  }

}
