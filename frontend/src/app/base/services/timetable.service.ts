import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Timetable } from '../models/dto/timetable.model';
import { map } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';
import { GeneralResourcesStoreService } from './store/general-store.service';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private readonly generalResourcesStoreService: GeneralResourcesStoreService) {
  }

  public verifyChangeTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.changingThesis);
  }

  public verifyClarificationTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.clarificationThesis);
  }

  public verifySelectingTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.selectingThesis);
  }

  public verifySubmittingTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.submittingThesis);
  }

  public verifyApprovingTopicByCommitteeDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.approvingThesisByCommittee);
  }

  public verifyApprovingTopicByCoordinatorDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.approvingThesisByCoordinator);
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
