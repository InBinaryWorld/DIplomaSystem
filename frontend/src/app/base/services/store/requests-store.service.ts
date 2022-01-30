import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  invalidateRequestsDataAction,
  loadClarificationRequestsAction,
  loadClarificationRequestsIfNeededAction
} from '../../store/requests/requests.actions';
import {
  selectClarificationRequests,
  selectClarificationRequestsMap,
  selectRequestsState,
  selectRequestsStateError,
  selectRequestsStateInProgress
} from '../../store/requests/requests.selectors';
import { RequestsState, RequestsStateByKey } from '../../store/requests/requests.state';
import { Dictionary } from '../../../core/models/dictionary.model';
import { StoreKeys } from '../../../core/utils/store-keys.utils';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { map, tap } from 'rxjs/operators';
import { UserRole } from '../../models/dto/user-role.model';
import { RequestsApiService } from '../api/requests-api.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsStoreService extends CleanableStoreService {

  constructor(private readonly requestsService: RequestsApiService,
              store: Store<AppState>) {
    super(store);
  }

  public invalidateRequestsForRole(userRole: UserRole): void {
    const key = StoreKeys.forUserRole(userRole);
    this.store.dispatch(invalidateRequestsDataAction({ key }));
  }

  public loadClarificationRequestsForRole(userRole: UserRole, ifNeededOnly = true): void {
    const key = StoreKeys.forUserRole(userRole);
    const action = ifNeededOnly
      ? loadClarificationRequestsIfNeededAction({ userRole, key })
      : loadClarificationRequestsAction({ userRole, key });
    this.store.dispatch(action);
  }

  public getClarificationRequestsForRole(userRole: UserRole, ifNeededOnly = true)
    : Observable<ClarificationRequest[] | undefined> {
    const key = StoreKeys.forUserRole(userRole);
    this.loadClarificationRequestsForRole(userRole, ifNeededOnly);
    return this.store.select(selectClarificationRequests, key);
  }

  public getClarificationRequestsForRoleById(userRole: UserRole, requestId: string, ifNeededOnly = true)
    : Observable<ClarificationRequest | undefined> {
    return this.getClarificationRequestsForRole(userRole, ifNeededOnly)
      .pipe(map(requests => requests?.find(r => r.id === requestId)));
  }

  public getUserState(): Observable<RequestsState | undefined> {
    return this.store.select(selectRequestsState);
  }

  public getClarificationRequestsMap(): Observable<Dictionary<RequestsStateByKey>> {
    return this.store.select(selectClarificationRequestsMap);
  }

  public rejectClarificationRequest(userRole: UserRole, id: string): Observable<void> {
    const invalidatePayload = { key: StoreKeys.forUserRole(userRole) };
    return this.requestsService.rejectClarificationRequestForRole(userRole, id)
      .pipe(tap(() => this.store.dispatch(invalidateRequestsDataAction(invalidatePayload))));
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectRequestsStateInProgress;
  }

  public getError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

}
