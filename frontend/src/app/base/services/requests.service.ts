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
import { IdType } from '../models/dto/id.model';

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

  public getChangeRequestForId(requestId: IdType, ifNeededOnly = true): Observable<ChangeRequest> {
    return this.requestsStoreService.getChangeRequestForId(requestId, ifNeededOnly);
  }

  public getClarificationRequestsForRole(userRole: UserRole, ifNeededOnly = true): Observable<ClarificationRequest[]> {
    return this.requestsStoreService.getClarificationRequestsForRole(userRole, ifNeededOnly);
  }

  public getClarificationRequestForId(requestId: IdType, ifNeededOnly = true): Observable<ClarificationRequest> {
    return this.requestsStoreService.getClarificationRequestForId(requestId, ifNeededOnly);
  }

  public invalidateClarificationRequests(): void {
    this.requestsStoreService.invalidateStoreForType(RequestsStateKey.CLARIFICATION);
  }

  public invalidateChangeRequests(): void {
    this.requestsStoreService.invalidateStoreForType(RequestsStateKey.CHANGE);
  }

  public rejectClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    return this.requestsApiService.rejectClarificationRequestWithDean(deanId, requestId)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  public approveClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    return this.requestsApiService.approveClarificationRequestWithDean(deanId, requestId)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  public createClarificationRequest(thesisId: IdType, request: Partial<ClarificationRequest>): Observable<ClarificationRequest> {
    return this.requestsApiService.createClarificationRequest(thesisId, request)
      .pipe(tap(() => this.invalidateClarificationRequests()));
  }

  public createChangeRequest(thesisId: IdType, request: any): Observable<ChangeRequest> {
    return this.requestsApiService.createChangeRequest(thesisId, request)
      .pipe(tap(() => this.invalidateChangeRequests()));
  }

  // public getExtClarificationRequests(userRole: UserRole, studentId: IdType): Observable<ClarificationRequestExt[]> {
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
