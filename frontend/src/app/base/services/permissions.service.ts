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
import { ThesisStatus } from '../models/dto/topic-status.model';
import { RequestsService } from './requests.service';
import { RequestStatus } from '../models/dto/request-status.model';
import { Employee } from '../models/dto/employee.model';

export type DeadlineSelector = (timetable: Timetable) => Date;

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {


  constructor(private readonly generalResourcesService: GeneralResourcesService,
              private readonly requestsService: RequestsService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService) {
  }

  // Coordinator
  public canCoordinatorConsiderThesis(coordinatorId: IdType, thesisId: IdType): Observable<boolean> {
    return this.canEmployeeActOnThesis(coordinatorId, thesisId,
      t => t.approvingThesisByCoordinator, ThesisStatus.WAITING);
  }

  // CommitteeMember
  public canCommitteeMemberConsiderThesis(committeeMemberId: IdType, thesisId: IdType): Observable<boolean> {
    return this.canEmployeeActOnThesis(committeeMemberId, thesisId,
      t => t.approvingThesisByCommittee, ThesisStatus.APPROVED_BY_COORDINATOR);
  }

  // Lecturer
  public canLecturerAcceptProposedThesis(coordinatorId: IdType, thesisId: IdType): Observable<boolean> {
    return combineLatest([
      this.userService.getEmployeeForId(coordinatorId),
      this.thesesService.getThesisForId(thesisId)
    ]).pipe(switchMap(([employee, thesis]) =>
      thesis.status !== ThesisStatus.PROPOSED_BY_STUDENT || thesis.supervisorId !== employee.id
        ? of(false)
        : this.verifyDeadlineForDiplomaSessionId(thesis.diplomaSessionId, t => t.submittingThesis)
    ));
  }

  // Dean
  public canDeanConsiderClarificationRequest(deanId: IdType, requestId: IdType): Observable<boolean> {
    return combineLatest([
      this.userService.getEmployeeForId(deanId),
      this.requestsService.getClarificationRequestForId(requestId)
    ]).pipe(switchMap(([dean, request]) =>
      dean.id !== request.employeeId || request.status !== RequestStatus.WAITING
        ? of(false)
        : this.verifyDeadlineForDiplomaSessionId(request.baseThesis.diplomaSessionId, t => t.clarificationThesis)
    ));
  }

  // public canDeanConsiderClarificationRequest(deanId: IdType, requestId: IdType): Observable<boolean> {
  //   return combineLatest([
  //     this.userService.getEmployeeForId(deanId),
  //     this.requestsService.getClarificationRequestForId(requestId)
  //   ]).pipe(switchMap(([dean, request]) =>
  //     dean.id !== request.employeeId || request.status !== RequestStatus.WAITING
  //       ? of(false)
  //       : this.checkEmployeeAccess(dean, request.baseThesis.diplomaSessionId, t => t.clarificationThesis)
  //   ));
  // }


  // Committee
  public canCommitteeConsiderChangeRequest(committeeId: IdType, requestId: IdType): Observable<boolean> {
    return combineLatest([
      this.userService.getEmployeeForId(committeeId),
      this.requestsService.getChangeRequestForId(requestId)
    ]).pipe(switchMap(([committee, request]) =>
      committee.id !== request.employeeId || request.status !== RequestStatus.WAITING
        ? of(false)
        : this.verifyDeadlineForDiplomaSessionId(request.newThesis.diplomaSessionId, t => t.changingThesis)
    ));
  }

  //Employee
  public canEmployeeActOnThesis(employeeId: IdType, thesisId: IdType, selector: DeadlineSelector, thesisStatus?: ThesisStatus): Observable<boolean> {
    return combineLatest([
      this.userService.getEmployeeForId(employeeId),
      this.thesesService.getThesisForId(thesisId)
    ]).pipe(switchMap(([employee, thesis]) =>
      isNotNil(thesisStatus) && thesis.status !== thesisStatus
        ? of(false)
        : this.checkEmployeeAccess(employee, thesis.diplomaSessionId, selector)
    ));
  }

  public checkEmployeeAccess(employee: Employee, targetDiplomaSessionId: IdType, selector: DeadlineSelector): Observable<boolean> {
    return this.generalResourcesService.getDiplomaSessionForId(targetDiplomaSessionId).pipe(
      switchMap(ds => !this.verifyDeadline(ds.timetable, selector) ? of(false)
        : this.generalResourcesService.getFieldsOfStudyForId(ds.fieldOfStudyId).pipe(
          map(thesisFieldOfStudy => thesisFieldOfStudy.departmentId === employee.departmentId)
        )
      )
    );
  }


  // Students
  public canReserveThesisWithId(studentId: IdType, thesisId: IdType): Observable<boolean> {
    return combineLatest([
      this.thesesService.getThesisForId(thesisId),
      this.userService.getStudentForId(studentId)
    ]).pipe(switchMap(([thesis, student]) => thesis.status !== ThesisStatus.APPROVED_BY_COMMITTEE
      ? of(false)
      : this.canStudentReserveThesisFromDiplomaSession(student, thesis.diplomaSessionId)
    ));
  }

  public canStudentReserveThesisFromDiplomaSession(student: Student, thesisDiplomaSessionId: IdType): Observable<boolean> {
    return combineLatest([
      this.generalResourcesService.getDiplomaSessionForId(thesisDiplomaSessionId),
      this.thesesService.getConfirmedStudentReservationsForDiplomaSessionId(student.id, thesisDiplomaSessionId)
    ]).pipe(map(([thesisDiplomaSession, blockers]) =>
      this.verifyDeadline(thesisDiplomaSession.timetable, t => t.selectingThesis)
      && student.fieldOfStudyId == thesisDiplomaSession.fieldOfStudyId
      && isEmpty(blockers)
    ));
  }


  public canCreateThesisPropositionInActiveSession(studentId: IdType): Observable<boolean> {
    return this.userService.getStudentForId(studentId).pipe(
      switchMap(student => this.thesesService.getConfirmedStudentReservationInActiveSession(student).pipe(
        switchMap(thesis => isNotNil(thesis) ? of(false)
          : this.verifyDeadlineForDiplomaSessionId(student.fieldOfStudy.activeDiplomaSessionId, t => t.submittingThesis)
        )
      ))
    );
  }

  public canCreateClarificationRequest(studentId: IdType): Observable<boolean> {
    return this.checkForStudentWithConfirmedReservation(studentId, t => t.clarificationThesis);
  }

  public canCreateChangeRequest(studentId: IdType): Observable<boolean> {
    return this.checkForStudentWithConfirmedReservation(studentId, t => t.changingThesis);
  }

  private checkForStudentWithConfirmedReservation(studentId: IdType, deadlineSelector: DeadlineSelector): Observable<boolean> {
    return this.userService.getStudentForId(studentId).pipe(
      switchMap(student => this.thesesService.getConfirmedStudentReservationInActiveSession(student)),
      switchMap(reservation => isNil(reservation)
        ? of(false)
        : this.verifyDeadlineForDiplomaSessionId(
          reservation.thesis.diplomaSessionId, deadlineSelector
        )
      )
    );
  }


  // General

  public verifyDeadlineForDiplomaSessionId(diplomaSessionId: IdType, deadlineSelector: DeadlineSelector): Observable<boolean> {
    return this.generalResourcesService.getDiplomaSessionForId(diplomaSessionId).pipe(
      filterExists(), map(ds => this.verifyDeadline(ds.timetable, deadlineSelector))
    );
  }

  public verifyDeadline(timetable: Timetable, deadlineSelector: DeadlineSelector): boolean {
    return new Date() < deadlineSelector(timetable);
  }

}
