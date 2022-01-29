import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { UserService } from '../../services/user.service';
import { loadCurrentUserAction, loadCurrentUserFailedAction, loadCurrentUserSuccessAction } from './user.actions';
import { selectCurrentUser } from './user.selectors';
import { ifNeededSwitchNotNil } from '../../../core/tools/If-needed-only-functions';
import { setContextRole } from '../session/session.actions';
import { firstItem } from '../../../core/tools/first-item';


@Injectable()
export class userEffects {

  loadCurrentUser = createEffect(() => this.actions.pipe(
    ofType(loadCurrentUserAction),
    ifNeededSwitchNotNil(() => this.store.select(selectCurrentUser)),
    switchMap(action => this.userService.getCurrentUser().pipe(
      mergeMap(user => [
        setContextRole({ contextRole: firstItem(user.roles) }),
        loadCurrentUserSuccessAction({ user })
      ]),
      catchError(error => of(loadCurrentUserFailedAction(error)))
    ))
  ));

  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>,
              private readonly userService: UserService) {
  }

}
