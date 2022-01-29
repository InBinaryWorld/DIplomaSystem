import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app-state.model';
import { CleanableStoreService } from '../../core/services/cleanable-store.service';
import {
  invalidateRequestsDataAction,
  loadClarificationRequestsAction,
  loadClarificationRequestsIfNeededAction
} from '../store/requests/requests.actions';
import {
  selectClarificationRequests,
  selectClarificationRequestsMap,
  selectRequestsState,
  selectRequestsStateError,
  selectRequestsStateInProgress
} from '../store/requests/requests.selectors';
import { RequestsState, RequestsStateByKey } from '../store/requests/requests.state';
import { Dictionary } from '../../core/models/dictionary.model';
import { Role } from '../models/dto/role.model';
import { StoreKeys } from '../../core/utils/store-keys.utils';

@Injectable({
  providedIn: 'root'
})
export class RequestsStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public invalidateRequestsForRole(role: Role, roleId: string): void {
    const key = StoreKeys.forUserRole(role, roleId);
    this.store.dispatch(invalidateRequestsDataAction({ key }));
  }

  public loadClarificationRequestsForRole(role: Role, roleId: string, ifNeededOnly = true): void {
    const key = StoreKeys.forUserRole(role, roleId);
    const action = ifNeededOnly
      ? loadClarificationRequestsIfNeededAction({ role, roleId, key })
      : loadClarificationRequestsAction({ role, roleId, key });
    this.store.dispatch(action);
  }

  public getStudentClarificationRequestsForRole(role: Role, roleId: string, ifNeededOnly = true)
    : Observable<RequestsStateByKey | undefined> {
    const key = StoreKeys.forUserRole(role, roleId);
    this.loadClarificationRequestsForRole(role, roleId, ifNeededOnly);
    return this.store.select(selectClarificationRequests, key);
  }

  public getUserState(): Observable<RequestsState | undefined> {
    return this.store.select(selectRequestsState);
  }

  public getClarificationRequestsMap(): Observable<Dictionary<RequestsStateByKey>> {
    return this.store.select(selectClarificationRequestsMap);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectRequestsStateInProgress;
  }

  getUserError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

}
