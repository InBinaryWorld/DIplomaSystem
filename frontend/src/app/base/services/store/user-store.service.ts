import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  selectCurrentUser,
  selectUserState,
  selectUserStateError,
  selectUserStateInProgress
} from '../../store/user/user.selectors';
import { User } from '../../models/dto/user.model';
import {
  invalidateCurrentUserAction,
  loadCurrentUserAction,
  loadCurrentUserIfNeededAction
} from '../../store/user/user.actions';
import { map } from 'rxjs/operators';
import { UserRole } from '../../models/dto/user-role.model';
import { UserState } from '../../store/user/user.state';
import { filterNotInProgress } from '../../../core/tools/filter-not-in-progress';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public invalidateCurrentUser(): void {
    this.store.dispatch(invalidateCurrentUserAction());
  }

  public loadCurrentUser(ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadCurrentUserIfNeededAction()
      : loadCurrentUserAction();
    this.store.dispatch(action);
  }

  public getCurrentUser(ifNeededOnly = true): Observable<User | undefined> {
    this.loadCurrentUser(ifNeededOnly);
    return this.store.select(selectCurrentUser);
  }

  public getUserState(): Observable<UserState | undefined> {
    return this.store.select(selectUserState);
  }

  public getUserRoles(ifNeededOnly = true): Observable<UserRole[] | undefined> {
    this.loadCurrentUser(ifNeededOnly);
    return this.getUserState().pipe(
      filterNotInProgress(),
      map(state => state?.currentUser?.roles)
    );
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectUserStateInProgress;
  }

  public getError(): Observable<any> {
    return this.store.select(selectUserStateError);
  }

}
