import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app-state.model';
import { UserRole } from '../models/dto/user-role.model';
import { CleanableStoreService } from '../../core/services/cleanable-store.service';
import {
  selectSessionContextRole,
  selectSessionLanguage,
  selectSessionStateError,
  selectSessionStateInProgress
} from '../store/session/session.selectors';
import { setContextRole, setLanguageAction } from '../store/session/session.actions';
import { AppLanguage } from '../../core/models/app-language.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectSessionStateInProgress;
  }

  setContextRole(role?: UserRole): void {
    this.store.dispatch(setContextRole({ contextRole: role }));
  }

  setLanguage(language: AppLanguage): void {
    this.store.dispatch(setLanguageAction({ language }));
  }

  getContextRole(): Observable<UserRole | undefined> {
    return this.store.select(selectSessionContextRole);
  }

  getLanguage(): Observable<AppLanguage | undefined> {
    return this.store.select(selectSessionLanguage);
  }

  getSessionError(): Observable<any> {
    return this.store.select(selectSessionStateError);
  }

}
