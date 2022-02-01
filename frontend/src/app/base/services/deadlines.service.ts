import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Timetable } from '../models/dto/timetable.model';
import { map } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';
import { GeneralResourcesStoreService } from './store/general-store.service';
import { ThesesService } from './theses.service';
import { isNil } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class DeadlinesService {

  constructor(private readonly generalResourcesStoreService: GeneralResourcesStoreService,
              private readonly thesesService: ThesesService) {
  }

  public canReserveThesis(): Observable<boolean> {
    return this.checkForCurrentDiplomaSession(t => t.selectingThesis);
  }

  public canCreateThesisProposition(): Observable<boolean> {
    return this.checkForCurrentDiplomaSession(t => t.submittingThesis);
  }

  public canCreateClarificationRequest(studentId: string): Observable<boolean> {
    return this.checkForActiveReservedThesis(studentId, t => t.clarificationThesis);
  }

  public canCreateChangeRequest(studentId: string): Observable<boolean> {
    return this.checkForActiveReservedThesis(studentId, t => t.changingThesis);
  }

  private checkForActiveReservedThesis(studentId: string, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.thesesService.getActiveReservedThesisForStudentId(studentId).pipe(
      switchMap(thesis => isNil(thesis)
        ? of(false)
        : this.verifyDeadlineForDiplomaSessionId(
          thesis.diplomaSessionId, deadlineSelector
        )
      )
    );
  }

  private checkForCurrentDiplomaSession(deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.generalResourcesStoreService.getCurrentDiplomaSession()
      .pipe(switchMap(ds => this.verifyDeadline(ds.timetableId, deadlineSelector)));
  }

  public verifyDeadlineForDiplomaSessionId(diplomaSessionId: string, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.generalResourcesStoreService.getDiplomaSessionForId(diplomaSessionId).pipe(
      filterExists(), switchMap(ds => this.verifyDeadline(ds.timetableId, deadlineSelector))
    );
  }

  public verifyDeadline(timetableId: string, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.generalResourcesStoreService.getTimetableForId(timetableId).pipe(
      filterExists(), map(timetable => this.checkDate(deadlineSelector(timetable)))
    );
  }

  private checkDate(endDate: Date): boolean {
    return new Date() < endDate;
  }

}
