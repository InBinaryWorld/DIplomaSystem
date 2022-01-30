import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { AuthData } from '../../models/auth-data.model';
import {
  selectAuthData,
  selectAuthError,
  selectAuthState,
  selectAuthStoreInProgress,
  selectIsLoggedIn
} from '../../store/auth/auth.selectors';
import { LoginData } from '../../models/login-data.model';
import { loginAction, logoutAction, refreshTokenAction } from '../../store/auth/auth.actions';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import { AuthState } from '../../store/auth/auth.state';
import { isNil } from 'lodash-es';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectAuthStoreInProgress;
  }

  login(loginData: LoginData): void {
    this.store.dispatch(loginAction({ loginData }));
  }

  refresh(): void {
    this.store.dispatch(refreshTokenAction());
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn);
  }

  getAuthState(): Observable<AuthState | undefined> {
    return this.store.select(selectAuthState);
  }

  getAuthData(): Observable<AuthData | undefined> {
    return this.store.select(selectAuthData);
  }

  getAuthDataWhenValid(): Observable<AuthData | undefined> {
    return this.store.select(selectAuthState).pipe(
      filter(state => !state.isInProgress && isNil(state.error)),
      map(state => state.authData)
    );
  }

  getError(): Observable<any> {
    return this.store.select(selectAuthError);
  }

}
