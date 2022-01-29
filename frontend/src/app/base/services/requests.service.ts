import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../core/services/server-http.service';
import { SettingsService } from '../../core/services/settings.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../core/models/api-route.model';
import { ClarificationRequest } from '../models/dto/clarification-request.model';
import { ChangeRequest } from '../models/dto/change-request.model';
import { Role } from '../models/dto/role.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private readonly http: ServerHttpService,
              private readonly settingsService: SettingsService) {
  }

  getClarificationRequestsForRole(role: Role, roleId: string): Observable<ClarificationRequest[]> {
    switch (role) {
      case Role.STUDENT:
        return this.getClarificationRequestsForStudentId(roleId);
      default:
        throw new Error('Cannot get requests for role:' + role);
    }
  }

  getClarificationRequestsForStudentId(studentId: string): Observable<ClarificationRequest[]> {
    return this.http.getWithLabel(ApiLabel.CLARIFICATION_REQUESTS);
  }

  getChangeRequestsForStudentId(studentId: string): Observable<ChangeRequest> {
    return this.http.getWithLabel(ApiLabel.CHANGE_REQUESTS);
  }

}
