import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { Timetable } from '../models/dto/timetable.model';
import { map } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';
import { ThesesService } from './theses.service';
import { isEmpty, isNil } from 'lodash-es';
import { IdType } from '../models/dto/id.model';
import { GeneralResourcesService } from './general-resources.service';
import { UserService } from './user.service';
import { isNotNil } from '../../core/tools/is-not-nil';
import { Student } from '../models/dto/student.model';

@Injectable({
  providedIn: 'root'
})
export class DeadlinesService {

  constructor(private readonly generalResourcesService: GeneralResourcesService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService) {
  }

  public canReserveThesisForId(studentId: IdType, thesisId: IdType): Observable<boolean> {
    return combineLatest([
      this.thesesService.getThesisForId(thesisId),
      this.userService.getStudentForId(studentId)
    ]).pipe(switchMap(([thesis, student]) => this.canStudentReserveThesis(student, thesis.diplomaSessionId)));
  }

  public canReserveThesisWithDiplomaSessionId(studentId: IdType, thesisDiplomaSessionId: IdType): Observable<boolean> {
    return this.userService.getStudentForId(studentId).pipe(
      switchMap(student => this.canStudentReserveThesis(student, thesisDiplomaSessionId))
    );
  }

  private canStudentReserveThesis(student: Student, thesisDiplomaSessionId: IdType): Observable<boolean> {
    return combineLatest([
      this.generalResourcesService.getDiplomaSessionForId(thesisDiplomaSessionId),
      this.thesesService.getConfirmedStudentReservationsOnNotRejectedThesisForDiplomaSessionId(student.id, thesisDiplomaSessionId)
    ]).pipe(switchMap(([thesisDiplomaSession, blockers]) =>
      this.verifyDeadline(thesisDiplomaSession.timetableId, t => t.selectingThesis).pipe(
        map((isTimetableOk) => {
          const fieldOfStudyMatch = student.fieldOfStudy.id == thesisDiplomaSession.fieldOfStudyId;
          return isEmpty(blockers) && isTimetableOk && fieldOfStudyMatch;
        })
      )
    ));
  }


  public canCreateThesisProposition(studentId: IdType): Observable<boolean> {
    return this.checkForStudentWithoutReservation(studentId, t => t.submittingThesis);
  }

  private checkForStudentWithoutReservation(studentId: IdType, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.userService.getStudentForId(studentId).pipe(
      switchMap(student => this.thesesService.getConfirmedStudentReservationOnNotRejectedThesisForActiveSession(student).pipe(
        switchMap(thesis => isNotNil(thesis) ? of(false)
          : this.verifyDeadlineForDiplomaSessionId(student.fieldOfStudy.activeDiplomaSessionId, deadlineSelector)
        )
      ))
    );
  }

  public canCreateClarificationRequest(studentId: IdType): Observable<boolean> {
    return this.checkForCurrentSessionWithActiveReservedThesis(studentId, t => t.clarificationThesis);
  }

  public canCreateChangeRequest(studentId: IdType): Observable<boolean> {
    return this.checkForCurrentSessionWithActiveReservedThesis(studentId, t => t.changingThesis);
  }

  private checkForCurrentSessionWithActiveReservedThesis(studentId: IdType, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.userService.getStudentForId(studentId).pipe(
      switchMap(student => this.thesesService.getConfirmedStudentReservationOnNotRejectedThesisForActiveSession(student)),
      switchMap(reservation => isNil(reservation)
        ? of(false)
        : this.verifyDeadlineForDiplomaSessionId(
          reservation.thesis.diplomaSessionId, deadlineSelector
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
