import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../models/dto/user-role.model';
import { tap } from 'rxjs/operators';
import { RequestsStateKey } from '../store/requests/requests.state';
import { RequestsStoreService } from './store/requests-store.service';
import { RequestsApiService } from './api/requests-api.service';
import { ClarificationRequest } from '../models/dto/clarification-request.model';
import { ThesesStoreService } from './store/theses-store.service';
import { ChangeRequest } from '../models/dto/change-request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private readonly requestsApiService: RequestsApiService,
              private readonly requestsStoreService: RequestsStoreService,
              private readonly thesesStoreService: ThesesStoreService) {
  }

  public getChangeRequestsForRole(userRole: UserRole, ifNeededOnly = true): Observable<ChangeRequest[]> {
    return this.requestsStoreService.getChangeRequestsForRole(userRole, ifNeededOnly);
  }

  public getChangeRequestForId(userRole: UserRole, requestId: string, ifNeededOnly = true): Observable<ChangeRequest | undefined> {
    return this.requestsStoreService.getChangeRequestForId(userRole, requestId, ifNeededOnly);
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

  public createClarificationRequest(thesisId: string, request: Partial<ClarificationRequest>): Observable<ClarificationRequest> {
    return this.requestsApiService.createClarificationRequest(thesisId, request)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  // public getExtClarificationRequests(userRole: UserRole, studentId: string): Observable<ClarificationRequestExt[]> {
  //   return this.getClarificationRequestsForRole(userRole).pipe(
  //     switchMap(clarifications => {
  //       if (isEmpty(clarifications)) {
  //         return of([]);
  //       }
  //       const thesesIds = [...new Set(clarifications.map(c => c.thesisId))];
  //       return combineLatest(
  //         thesesIds.map(t => this.thesesStoreService.getThesisForId(t).pipe(filterExists()))
  //       ).pipe(
  //         map(theses => keyBy(theses, t => t.id)),
  //         map(thesesById => this.prepareExtClRequests(clarifications, thesesById))
  //       );
  //     })
  //   );
  // }

  // private prepareExtClRequests(clarifications: ClarificationRequest[], thesesById: Dictionary<Thesis>): ClarificationRequestExt[] {
  //   return clarifications.map(c => ({ ...c, thesis: thesesById[c.thesisId] }));
  // }

}
