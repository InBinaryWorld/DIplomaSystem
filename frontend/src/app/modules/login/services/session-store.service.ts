import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SessionData } from '../models/session-data.model';
import {
  selectContextRole,
  selectIsLoggedIn,
  selectSession,
  selectSessionActionInProgress,
  selectSessionError
} from '../store/session.selectors';
import { LoginData } from '../models/login-data.model';
import { loginAction, logoutAction, setContextRole } from '../store/session.actions';
import { AppState } from "../../../core/store/app-state.model";
import { UserRole } from "../models/user-role.model";

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  constructor(private readonly store: Store<AppState>) {
  }

  login(loginData: LoginData): void {
    this.store.dispatch(loginAction({ loginData }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  setContextRole(role?: UserRole): void {
    this.store.dispatch(setContextRole({ contextRole: role }));
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn);
  }

  getSessionData(): Observable<SessionData | undefined> {
    return this.store.select(selectSession);
  }

  getContextRole(): Observable<UserRole | undefined> {
    return this.store.select(selectContextRole);
  }

  getSessionActionProgress(): Observable<boolean> {
    return this.store.select(selectSessionActionInProgress);
  }

  getSessionError(): Observable<any> {
    return this.store.select(selectSessionError);
  }

}
