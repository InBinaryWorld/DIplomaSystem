import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  invalidateRequestsDataAction,
  loadClarificationRequestsAction,
  loadClarificationRequestsForIdAction,
  loadClarificationRequestsForIdIfNeededAction,
  loadClarificationRequestsIfNeededAction
} from '../../store/requests/requests.actions';
import {
  selectClarificationRequestForId,
  selectClarificationRequestsForKey,
  selectRequestsState,
  selectRequestsStateError,
  selectRequestsStateInProgress
} from '../../store/requests/requests.selectors';
import { RequestsState, RequestsStoreType } from '../../store/requests/requests.state';
import { StoreKeys } from '../../../core/utils/store-keys.utils';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { tap } from 'rxjs/operators';
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

  public invalidateRequestsForType(resourceType: RequestsStoreType): void {
    this.store.dispatch(invalidateRequestsDataAction({ resourceType }));
  }

  private loadClarificationRequestsForRole(userRole: UserRole, key = StoreKeys.forUserRole(userRole), ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadClarificationRequestsIfNeededAction({ userRole, key })
      : loadClarificationRequestsAction({ userRole, key });
    this.store.dispatch(action);
  }

  private loadClarificationRequestForId(userRole: UserRole, id: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadClarificationRequestsForIdIfNeededAction({ userRole, id })
      : loadClarificationRequestsForIdAction({ userRole, id });
    this.store.dispatch(action);
  }

  public getClarificationRequestsForRole(userRole: UserRole, ifNeededOnly = true)
    : Observable<ClarificationRequest[] | undefined> {
    const key = StoreKeys.forUserRole(userRole);
    this.loadClarificationRequestsForRole(userRole, key, ifNeededOnly);
    return this.store.select(selectClarificationRequestsForKey, key);
  }

  public getClarificationRequestsForId(userRole: UserRole, requestId: string, ifNeededOnly = true)
    : Observable<ClarificationRequest | undefined> {
    this.loadClarificationRequestForId(userRole, requestId);
    return this.store.select(selectClarificationRequestForId, requestId);
  }

  public getUserState(): Observable<RequestsState | undefined> {
    return this.store.select(selectRequestsState);
  }

  public rejectClarificationRequest(userRole: UserRole, id: string): Observable<void> {
    return this.requestsService.rejectClarificationRequestForRole(userRole, id)
      .pipe(tap(() => this.invalidateRequestsForType(RequestsStoreType.CLARIFICATION)));
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectRequestsStateInProgress;
  }

  public getError(): Observable<any> {
    return this.store.select(selectRequestsStateError);
  }

}
