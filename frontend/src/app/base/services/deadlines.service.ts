import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Timetable } from '../models/dto/timetable.model';
import { map } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';
import { ThesesService } from './theses.service';
import { isNil } from 'lodash-es';
import { IdType } from '../models/dto/id.model';
import { GeneralResourcesService } from './general-resources.service';
import { UserService } from './user.service';
import { isNotNil } from '../../core/tools/is-not-nil';

@Injectable({
  providedIn: 'root'
})
export class DeadlinesService {

  constructor(private readonly generalResourcesService: GeneralResourcesService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService) {
  }

  public canReserveThesis(studentId: IdType): Observable<boolean> {
    return this.checkForStudentWithoutReservation(studentId, t => t.selectingThesis);
  }

  public canCreateThesisProposition(studentId: IdType): Observable<boolean> {
    return this.checkForStudentWithoutReservation(studentId, t => t.submittingThesis);
  }

  private checkForStudentWithoutReservation(studentId: IdType, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.userService.getStudentForId(studentId).pipe(
      switchMap(student => this.thesesService.getActiveConfirmedStudentReservation(student).pipe(
        switchMap(thesis => isNotNil(thesis) ? of(false)
          : this.verifyDeadlineForDiplomaSessionId(student.fieldOfStudy.activeDiplomaSessionId, deadlineSelector)
        )
      ))
    );
  }

  public canCreateClarificationRequest(studentId: IdType): Observable<boolean> {
    return this.checkForActiveReservedThesis(studentId, t => t.clarificationThesis);
  }

  public canCreateChangeRequest(studentId: IdType): Observable<boolean> {
    return this.checkForActiveReservedThesis(studentId, t => t.changingThesis);
  }

  private checkForActiveReservedThesis(studentId: IdType, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.userService.getStudentForId(studentId).pipe(
      switchMap(student => this.thesesService.getActiveReservedThesisForStudent(student)),
      switchMap(thesis => isNil(thesis)
        ? of(false)
        : this.verifyDeadlineForDiplomaSessionId(
          thesis.diplomaSessionId, deadlineSelector
        )
      )
    );
  }

  public verifyDeadlineForDiplomaSessionId(diplomaSessionId: IdType, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.generalResourcesService.getDiplomaSessionForId(diplomaSessionId).pipe(
      filterExists(), switchMap(ds => this.verifyDeadline(ds.timetableId, deadlineSelector))
    );
  }

  public verifyDeadline(timetableId: IdType, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.generalResourcesService.getTimetableForId(timetableId).pipe(
      filterExists(), map(timetable => this.checkDate(deadlineSelector(timetable)))
    );
  }

  private checkDate(endDate: Date): boolean {
    return new Date() < endDate;
  }

}
