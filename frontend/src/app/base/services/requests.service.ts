import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../models/dto/user-role.model';
import { tap } from 'rxjs/operators';
import { RequestsStateKey } from '../store/requests/requests.state';
import { RequestsStoreService } from './store/requests-store.service';
import { RequestsApiService } from './api/requests-api.service';
import { ClarificationRequest } from '../models/dto/clarification-request.model';
import { StoreKeys } from '../../core/utils/store-keys.utils';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private readonly requestsApiService: RequestsApiService,
              private readonly requestsStoreService: RequestsStoreService) {
  }

  public invalidateClarificationRequests(): void {
    this.requestsStoreService.invalidateStoreForType(RequestsStateKey.CLARIFICATION);
  }

  public rejectClarificationRequest(userRole: UserRole, id: string): Observable<void> {
    return this.requestsApiService.rejectClarificationRequestForRole(userRole, id)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  public getClarificationRequestsForRole(userRole: UserRole, ifNeededOnly = true)
    : Observable<ClarificationRequest[] | undefined> {
    const key = StoreKeys.forUserRole(userRole);
    this.requestsStoreService.loadRequests(RequestsStateKey.CLARIFICATION, userRole, key, ifNeededOnly);
    return this.requestsStoreService.selectClarificationRequestsForKey(key);
  }

  public getClarificationRequestForId(userRole: UserRole, requestId: string, ifNeededOnly = true)
    : Observable<ClarificationRequest | undefined> {
    this.requestsStoreService.loadRequestForId(RequestsStateKey.CLARIFICATION, userRole, requestId, ifNeededOnly);
    return this.requestsStoreService.selectClarificationRequestForId(requestId);
  }


}
