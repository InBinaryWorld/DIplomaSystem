import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  invalidateRequestsDataAction,
  loadRequestForIdAction,
  loadRequestForIdIfNeededAction,
  loadRequestsAction,
  loadRequestsIfNeededAction
} from '../../store/requests/requests.actions';
import {
  selectChangeRequestForId,
  selectChangeRequestsForKey,
  selectClarificationRequestForId,
  selectClarificationRequestsForKey,
  selectRequestsStateError,
  selectRequestsStateInProgress
} from '../../store/requests/requests.selectors';
import { RequestsStateKey } from '../../store/requests/requests.state';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { UserRole } from '../../models/dto/user-role.model';
import { ChangeRequest } from '../../models/dto/change-request.model';
import { StoreKeys } from '../../../core/utils/store-keys.utils';
import { filterExists } from '../../../core/tools/filter-exists';
import { IdType } from '../../models/dto/id.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getChangeRequestsForRole(userRole: UserRole, ifNeededOnly = true)
    : Observable<ChangeRequest[]> {
    const key = StoreKeys.forUserRole(userRole);
    this.loadRequests(RequestsStateKey.CHANGE, userRole, key, ifNeededOnly);
    return this.selectChangeRequestsForKey(key).pipe(filterExists());
  }

  public getChangeRequestForId(userRole: UserRole, requestId: IdType, ifNeededOnly = true)
    : Observable<ChangeRequest | undefined> {
    this.loadRequestForId(RequestsStateKey.CHANGE, userRole, requestId, ifNeededOnly);
    return this.selectChangeRequestForId(requestId);
  }


  public getClarificationRequestsForRole(userRole: UserRole, ifNeededOnly = true)
    : Observable<ClarificationRequest[]> {
    const key = StoreKeys.forUserRole(userRole);
    this.loadRequests(RequestsStateKey.CLARIFICATION, userRole, key, ifNeededOnly);
    return this.selectClarificationRequestsForKey(key).pipe(filterExists());
  }

  public getClarificationRequestForId(userRole: UserRole, requestId: IdType, ifNeededOnly = true)
    : Observable<ClarificationRequest | undefined> {
    this.loadRequestForId(RequestsStateKey.CLARIFICATION, userRole, requestId, ifNeededOnly);
    return this.selectClarificationRequestForId(requestId);
  }

  public loadRequests(resourceType: RequestsStateKey, userRole: UserRole, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadRequestsIfNeededAction({ resourceType, userRole, key })
      : loadRequestsAction({ resourceType, userRole, key });
    this.store.dispatch(action);
  }

  public loadRequestForId(resourceType: RequestsStateKey, userRole: UserRole, id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadRequestForIdIfNeededAction({ resourceType, userRole, id })
      : loadRequestForIdAction({ resourceType, userRole, id });
    this.store.dispatch(action);
  }

  public invalidateStoreForType(resourceType: RequestsStateKey): void {
    this.store.dispatch(invalidateRequestsDataAction({ resourceType }));
  }

  public selectClarificationRequestsForKey(key: string): Observable<ClarificationRequest[] | undefined> {
    return this.store.select(selectClarificationRequestsForKey, key);
  }

  public selectClarificationRequestForId(id: IdType): Observable<ClarificationRequest | undefined> {
    return this.store.select(selectClarificationRequestForId, id);
  }

  public selectChangeRequestsForKey(key: string): Observable<ChangeRequest[] | undefined> {
    return this.store.select(selectChangeRequestsForKey, key);
  }

  public selectChangeRequestForId(id: IdType): Observable<ChangeRequest | undefined> {
    return this.store.select(selectChangeRequestForId, id);
  }


  public selectStateError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectRequestsStateInProgress;
  }

}
