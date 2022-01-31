import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../models/dto/user-role.model';
import { tap } from 'rxjs/operators';
import { RequestsStateKey } from '../store/requests/requests.state';
import { RequestsStoreService } from './store/requests-store.service';
import { RequestsApiService } from './api/requests-api.service';
import { ClarificationRequest } from '../models/dto/clarification-request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private readonly requestsApiService: RequestsApiService,
              private readonly requestsStoreService: RequestsStoreService) {
  }

  public getClarificationRequestsForRole(userRole: UserRole, ifNeededOnly = true): Observable<ClarificationRequest[]> {
    return this.requestsStoreService.getClarificationRequestsForRole(userRole, ifNeededOnly);
  }

  public getClarificationRequestForId(userRole: UserRole, requestId: string, ifNeededOnly = true): Observable<ClarificationRequest | undefined> {
    return this.requestsStoreService.getClarificationRequestForId(userRole, requestId, ifNeededOnly);
  }

  public invalidateClarificationRequests(): void {
    this.requestsStoreService.invalidateStoreForType(RequestsStateKey.CLARIFICATION);
  }

  public rejectClarificationRequest(userRole: UserRole, id: string): Observable<void> {
    return this.requestsApiService.rejectClarificationRequestForRole(userRole, id)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }


}
