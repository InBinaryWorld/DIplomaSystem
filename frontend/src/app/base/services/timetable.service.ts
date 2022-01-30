import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResourcesStoreService } from './store/general-resourecs-store.service';
import { Timetable } from '../models/dto/timetable.model';
import { map } from 'rxjs/operators';
import { filterExists } from '../../core/tools/filter-exists';
import { GeneralStoreType } from '../store/general/general.state';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor(private readonly resourcesStoreService: GeneralResourcesStoreService) {
  }

  public getAllTimetables(ifNeededOnly = true): Observable<Timetable[]> {
    return this.resourcesStoreService.getResourcesForType<Timetable>(GeneralStoreType.TIMETABLES, ifNeededOnly);
  }

  public getTimetableForId(id: string, ifNeededOnly = true): Observable<Timetable | undefined> {
    return this.resourcesStoreService.getResourcesForTypeAndId<Timetable>(GeneralStoreType.TIMETABLES, id, ifNeededOnly);
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
    return this.getTimetableForId(timetableId).pipe(
      filterExists(),
      map(timetable => this.checkDate(deadlineSelector(timetable)))
    );
  }

  private checkDate(endDate: Date): boolean {
    return new Date() < endDate;
  }

}
