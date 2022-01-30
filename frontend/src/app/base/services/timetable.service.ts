import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timetable } from '../models/dto/timetable.model';
import { map } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';
import { GeneralResourcesService } from './general-resources.service';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private readonly generalResourcesService: GeneralResourcesService) {
  }

  public verifyChangeTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.changingTopics);
  }

  public verifyClarificationTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.clarificationTopics);
  }

  public verifySelectingTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.selectingTopics);
  }

  public verifySubmittingTopicDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.submittingTopics);
  }

  public verifyApprovingTopicByCommitteeDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.approvingTopicsByCommittee);
  }

  public verifyApprovingTopicByCoordinatorDeadline(timetableId: string): Observable<boolean> {
    return this.verifyDeadline(timetableId, t => t.approvingTopicsByCoordinator);
  }

  private verifyDeadline(timetableId: string, deadlineSelector: (timetable: Timetable) => Date): Observable<boolean> {
    return this.generalResourcesService.getTimetableForId(timetableId).pipe(
      filterExists(), map(timetable => this.checkDate(deadlineSelector(timetable)))
    );
  }

  private checkDate(endDate: Date): boolean {
    return new Date() < endDate;
  }

}
