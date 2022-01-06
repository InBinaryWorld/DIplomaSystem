import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SessionData } from '../models/session-data.model';
import {
  selectIsLoggedIn,
  selectSession,
  selectSessionActionInProgress,
  selectSessionError
} from '../store/session.selectors';
import { LoginData } from '../models/login-data.model';
import { loginAction, logoutAction } from '../store/session.actions';
import { AppState } from "../../../core/store/app-state.model";

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

  isUserLoggedIn(): Observable<boolean> {
    return this.store.select(selectIsLoggedIn);
  }

  getSessionData(): Observable<SessionData | undefined> {
    return this.store.select(selectSession);
  }

  getSessionActionProgress(): Observable<boolean> {
    return this.store.select(selectSessionActionInProgress);
  }

  getSessionError(): Observable<any> {
    return this.store.select(selectSessionError);
  }

}
