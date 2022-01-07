import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable } from 'rxjs';
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
import { SpinnerService } from "../../../core/services/spinner.service";
import { CleanableService } from "../../../core/services/cleanable.service";
import { Cleanable } from "../../../core/directives/cleanable.directive";

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService extends CleanableService {

  constructor(private readonly store: Store<AppState>,
              private readonly spinnerService: SpinnerService) {
    super();
  }

  public init(cleanable: Cleanable, changeDetector: ChangeDetectorRef) {
    cleanable.addSubscription(
      this.getSessionActionProgress().pipe(distinctUntilChanged())
        .subscribe(inProgress => this.spinnerService.act(inProgress, changeDetector))
    )
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
