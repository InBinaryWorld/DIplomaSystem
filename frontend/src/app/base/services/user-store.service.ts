import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app-state.model';
import { CleanableStoreService } from '../../core/services/cleanable-store.service';
import { selectCurrentUser, selectUserStateError, selectUserStateInProgress } from '../store/user/user.selectors';
import { User } from '../models/dto/user.model';
import { invalidateCurrentUserAction, loadCurrentUserAction } from '../store/user/user.actions';

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
    this.store.dispatch(loadCurrentUserAction({ ifNeededOnly }));
  }

  public getCurrentUser(ifNeededOnly = true): Observable<User | undefined> {
    this.loadCurrentUser(ifNeededOnly);
    return this.store.select(selectCurrentUser);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectUserStateInProgress;
  }

  getUserError(): Observable<any> {
    return this.store.select(selectUserStateError);
  }

}
