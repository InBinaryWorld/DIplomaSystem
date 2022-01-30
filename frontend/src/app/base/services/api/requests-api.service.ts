import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';
import { UserRole } from '../../models/dto/user-role.model';
import { RequestParams } from '../../../core/models/request-param.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  rejectClarificationRequestForRole(userRole: UserRole, requestId: string): Observable<void> {
    const rejectPayload = { requestId, role: userRole.role, roleId: userRole.id };
    return this.http.postWithLabel(ApiLabel.REJECT_CLARIFICATION_REQUESTS, rejectPayload);
  }

  getClarificationRequestsForRole(userRole: UserRole): Observable<ClarificationRequest[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('role', userRole.role);
    queryParams.addIfValueExists('roleId', userRole.id);
    return this.http.getWithLabel(ApiLabel.GET_CLARIFICATION_REQUESTS, undefined, queryParams);
  }

  getChangeRequestsForRole(userRole: UserRole): Observable<ChangeRequest[]> {
    const queryParams = new RequestParams();
    queryParams.addIfValueExists('role', userRole.role);
    queryParams.addIfValueExists('roleId', userRole.id);
    return this.http.getWithLabel(ApiLabel.GET_CHANGE_REQUESTS, undefined, queryParams);
  }

}
