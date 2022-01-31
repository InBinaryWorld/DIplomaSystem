import { Injectable } from '@angular/core';
import { TimetableService } from '../../../base/services/timetable.service';
import { RequestsService } from '../../../base/services/requests.service';
import { ThesesService } from '../../../base/services/theses.service';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { isEmpty, isNil, keyBy } from 'lodash-es';
import { Role } from '../../../base/models/dto/role.model';
import { UserRole } from '../../../base/models/dto/user-role.model';
import { ClarificationRequest } from '../../../base/models/dto/clarification-request.model';
import { map } from 'rxjs/operators';
import { ClarificationRequestExt } from '../../../base/models/extended/clarification-request-ext.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { Thesis } from '../../../base/models/dto/thesis.model';
import { filterExists } from '../../../core/tools/filter-exists';

@Injectable({
  providedIn: 'root'
})
export class StudentViewService {

  constructor(private readonly timetableService: TimetableService,
              private readonly requestsService: RequestsService,
              private readonly thesesService: ThesesService) {
  }

  public canCreateClarificationRequest(studentId: string): Observable<boolean> {
    return this.thesesService.getActiveReservedThesisForStudentId(studentId).pipe(
      switchMap(tr => isNil(tr)
        ? of(false)
        : this.timetableService.verifyDeadlineForDiplomaSessionId(
          tr[0].diplomaSessionId, t => t.clarificationThesis
        )
      )
    );
  }

  public getExtClarificationRequests(studentId: string): Observable<ClarificationRequestExt[]> {
    const userRole: UserRole = { role: Role.STUDENT, id: studentId };
    return this.requestsService.getClarificationRequestsForRole(userRole).pipe(
      switchMap(clarifications => {
        if (isEmpty(clarifications)) {
          return of([]);
        }
        const thesesIds = [...new Set(clarifications.map(c => c.thesisId))];
        return combineLatest(
          thesesIds.map(t => this.thesesService.getThesisForId(t).pipe(filterExists()))
        ).pipe(
          map(theses => keyBy(theses, t => t.id)),
          map(thesesById => this.prepareExtClRequests(clarifications, thesesById))
        );
      })
    );
  }


  private prepareExtClRequests(clarifications: ClarificationRequest[], thesesById: Dictionary<Thesis>): ClarificationRequestExt[] {
    return clarifications.map(c => ({ ...c, thesis: thesesById[c.thesisId] }));
  }
}
