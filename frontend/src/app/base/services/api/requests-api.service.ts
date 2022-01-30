import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { UserRole } from '../../models/dto/user-role.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { isNil } from 'lodash-es';
import { RequestsStateKey } from '../../store/requests/requests.state';

@Injectable({
  providedIn: 'root'
})
export class RequestsApiService {

  private apiLabelMap: Dictionary<ApiLabel> = {
    [RequestsStateKey.CLARIFICATION]: ApiLabel.GET_CLARIFICATION_REQUESTS,
    [RequestsStateKey.CHANGE]: ApiLabel.GET_CHANGE_REQUESTS
  };

  constructor(private readonly http: ServerHttpService) {
  }

  getRequestsForUserRole(resourceType: RequestsStateKey, userRole: UserRole): Observable<any> {
    const apiLabel = this.apiLabelMap[resourceType];
    if (isNil(apiLabel)) {
      throw new Error('Unhandled resource type: ' + resourceType);
    }
    return this.getRequests(apiLabel, userRole);
  }

  getRequestForId(resourceType: RequestsStateKey, id: string): Observable<any> {
    const apiLabel = this.apiLabelMap[resourceType];
    if (isNil(apiLabel)) {
      throw new Error('Unhandled resource type: ' + resourceType);
    }
    return this.getResourceForId(apiLabel, id);
  }

  private getRequests<T>(apiLabel: ApiLabel, userRole: UserRole): Observable<T[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('role', userRole.role);
    queryParams.addIfValueExists('roleId', userRole.id);
    return this.http.getWithLabel(apiLabel, undefined, queryParams);
  }

  private getResourceForId<T>(apiLabel: ApiLabel, id: string): Observable<T> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getWithLabel(apiLabel, undefined, query);
  }

  rejectClarificationRequestForRole(userRole: UserRole, requestId: string): Observable<void> {
    const rejectPayload = { requestId, role: userRole.role, roleId: userRole.id };
    return this.http.postWithLabel(ApiLabel.REJECT_CLARIFICATION_REQUESTS, rejectPayload);
  }

}
