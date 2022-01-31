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
import { UserState } from '../../store/user/user.state';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getCurrentUser(ifNeededOnly = true): Observable<User | undefined> {
    this.loadCurrentUser(ifNeededOnly);
    return this.selectCurrentUser();
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

  public selectCurrentUser(): Observable<User | undefined> {
    return this.store.select(selectCurrentUser);
  }

  public selectUserState(): Observable<UserState | undefined> {
    return this.store.select(selectUserState);
  }

  public selectStateError(): Observable<any> {
    return this.store.select(selectUserStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectUserStateInProgress;
  }

}
