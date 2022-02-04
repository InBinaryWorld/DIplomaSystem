import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { UserRole } from '../../models/dto/user-role.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { RequestsStateKey, RequestType } from '../../store/requests/requests.state';
import { BaseApiService } from './base-api.service';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';
import { IdType } from '../../models/dto/id.model';
import { Role } from '../../models/dto/role.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsApiService extends BaseApiService {
  private requestsApiLabelMap: Dictionary<ApiLabel> = {
    [RequestsStateKey.CLARIFICATION]: ApiLabel.GET_CLARIFICATION_REQUESTS,
    [RequestsStateKey.CHANGE]: ApiLabel.GET_CHANGE_REQUESTS
  };
  private requestApiLabelMap: Dictionary<ApiLabel> = {
    [RequestsStateKey.CLARIFICATION]: ApiLabel.GET_CLARIFICATION_REQUEST,
    [RequestsStateKey.CHANGE]: ApiLabel.GET_CHANGE_REQUEST
  };

  constructor(private readonly http: ServerHttpService) {
    super();
  }

  getRequestsForUserRole(resourceType: RequestsStateKey, userRole: UserRole): Observable<RequestType[]> {
    const apiLabel = this.getApiLabel(this.requestsApiLabelMap, resourceType);

    const queryParams = new RequestParams();
    queryParams.addIfValueExists('role', userRole.role);
    queryParams.addIfValueExists('roleId', userRole.id);
    return this.http.getWithLabel(apiLabel, undefined, queryParams);
  }

  getRequestForId(resourceType: RequestsStateKey, id: IdType): Observable<RequestType> {
    const apiLabel = this.getApiLabel(this.requestApiLabelMap, resourceType);

    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getWithLabel(apiLabel, undefined, query);
  }

  rejectClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.DEAN, roleId: deanId };
    return this.http.postWithLabel(ApiLabel.REJECT_CLARIFICATION_REQUEST, payload);
  }

  approveClarificationRequestWithDean(deanId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.DEAN, roleId: deanId };
    return this.http.postWithLabel(ApiLabel.APPROVE_CLARIFICATION_REQUEST, payload);
  }

  createClarificationRequest(thesisId: IdType, payload: Partial<ClarificationRequest>): Observable<ClarificationRequest> {
    return this.http.postWithLabel(ApiLabel.CREATE_CLARIFICATION_REQUEST, payload);
  }

  rejectChangeRequestWithCommitteeMember(committeeMemberId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.PROGRAM_COMMITTEE_MEMBER, roleId: committeeMemberId };
    return this.http.postWithLabel(ApiLabel.REJECT_CHANGE_REQUEST, payload);
  }

  approveChangeRequestWithCommitteeMember(committeeMemberId: IdType, requestId: IdType): Observable<void> {
    const payload = { requestId, role: Role.PROGRAM_COMMITTEE_MEMBER, roleId: committeeMemberId };
    return this.http.postWithLabel(ApiLabel.APPROVE_CHANGE_REQUEST, payload);
  }

  createChangeRequest(thesisId: IdType, payload: any): Observable<ChangeRequest> {
    return this.http.postWithLabel(ApiLabel.CREATE_CHANGE_REQUEST, payload);
  }

}
