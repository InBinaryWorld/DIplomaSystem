import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { UserService } from '../../services/user.service';
import {
  loadCurrentUserAction,
  loadCurrentUserFailedAction,
  loadCurrentUserIfNeededAction,
  loadCurrentUserSuccessAction
} from './user.actions';
import { selectCurrentUser } from './user.selectors';
import { switchIfNil } from '../../../core/tools/If-needed-only-functions';
import { selectIsLoggedIn } from '../auth/auth.selectors';


@Injectable()
export class userEffects {

  loadCurrentUserIfNeeded = createEffect(() => this.actions.pipe(
    ofType(loadCurrentUserIfNeededAction),
    switchIfNil(() => this.store.select(selectCurrentUser)),
    map(() => loadCurrentUserAction())
  ));

  loadCurrentUser = createEffect(() => this.actions.pipe(
    ofType(loadCurrentUserAction),
    switchMap(() => this.store.select(selectIsLoggedIn).pipe(
      first(),
      switchMap(isLoggedIn => !isLoggedIn
        ? [loadCurrentUserFailedAction({ error: new Error('User is not logged in') })]
        : this.userService.getCurrentUser().pipe(
          map(user => loadCurrentUserSuccessAction({ user })),
          catchError(error => of(loadCurrentUserFailedAction(error)))
        ))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly userService: UserService) {
  }

}
