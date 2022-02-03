import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import {
  invalidateGeneralResourcesAction,
  loadGeneralResourceForIdAction,
  loadGeneralResourceForIdIfNeededAction,
  loadGeneralResourcesAction,
  loadGeneralResourcesIfNeededAction
} from '../../store/general/general.actions';
import {
  selectDepartmentForId,
  selectDepartmentsForKey,
  selectDiplomaSessionForId,
  selectDiplomaSessionsForKey,
  selectFieldOfStudyForId,
  selectFieldsOfStudyForKey,
  selectGeneralStateError,
  selectGeneralStateInProgress,
  selectTimetableForId,
  selectTimetablesForKey
} from '../../store/general/general.selectors';
import { GeneralResourcesStateKey } from '../../store/general/general.state';
import { Department } from '../../models/dto/department.model';
import { FieldOfStudy } from '../../models/dto/field-of-study.model';
import { DiplomaSession } from '../../models/dto/diploma-session.model';
import { Timetable } from '../../models/dto/timetable.model';
import { IdType } from '../../models/dto/id.model';
import { filterExists } from '../../../core/tools/filter-exists';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesStoreService extends CleanableStoreService {

  constructor(store: Store<AppState>) {
    super(store);
  }

  public getTimetablesForKey(key: string, ifNeededOnly = true): Observable<Timetable[]> {
    this.loadResourcesForKey(GeneralResourcesStateKey.TIMETABLES, key, ifNeededOnly);
    return this.selectTimetablesForKey(key).pipe(filterExists());
  }

  public getTimetableForId(id: IdType, ifNeededOnly = true): Observable<Timetable> {
    this.loadResourceForId(GeneralResourcesStateKey.TIMETABLES, id, ifNeededOnly);
    return this.selectTimetableForId(id).pipe(filterExists());
  }

  public getDiplomaSessionsForKey(key: string, ifNeededOnly = true): Observable<DiplomaSession[]> {
    this.loadResourcesForKey(GeneralResourcesStateKey.DIPLOMA_SESSIONS, key, ifNeededOnly);
    return this.selectDiplomaSessionsForKey(key).pipe(filterExists());
  }

  public getDiplomaSessionForId(id: IdType, ifNeededOnly = true): Observable<DiplomaSession> {
    this.loadResourceForId(GeneralResourcesStateKey.DIPLOMA_SESSIONS, id, ifNeededOnly);
    return this.selectDiplomaSessionForId(id).pipe(filterExists());
  }

  public invalidateStoreForKey(resourceType: GeneralResourcesStateKey): void {
    this.store.dispatch(invalidateGeneralResourcesAction({ resourceType }));
  }

  public loadResourcesForKey(resourceType: GeneralResourcesStateKey, key: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadGeneralResourcesIfNeededAction({ resourceType, key })
      : loadGeneralResourcesAction({ resourceType, key });
    this.store.dispatch(action);
  }

  public loadResourceForId(resourceType: GeneralResourcesStateKey, id: IdType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadGeneralResourceForIdIfNeededAction({ resourceType, id })
      : loadGeneralResourceForIdAction({ resourceType, id });
    this.store.dispatch(action);
  }

  public selectDepartmentsForKey(key: string): Observable<Department[] | undefined> {
    return this.store.select(selectDepartmentsForKey, key);
  }

  public selectDepartmentForId(id: IdType): Observable<Department | undefined> {
    return this.store.select(selectDepartmentForId, id);
  }

  public selectFieldsOfStudyForKey(key: string): Observable<FieldOfStudy[] | undefined> {
    return this.store.select(selectFieldsOfStudyForKey, key);
  }

  public selectFieldOfStudyForId(id: IdType): Observable<FieldOfStudy | undefined> {
    return this.store.select(selectFieldOfStudyForId, id);
  }

  public selectDiplomaSessionsForKey(key: string): Observable<DiplomaSession[] | undefined> {
    return this.store.select(selectDiplomaSessionsForKey, key);
  }

  public selectDiplomaSessionForId(id: IdType): Observable<DiplomaSession | undefined> {
    return this.store.select(selectDiplomaSessionForId, id);
  }

  public selectTimetablesForKey(key: string): Observable<Timetable[] | undefined> {
    return this.store.select(selectTimetablesForKey, key);
  }

  public selectTimetableForId(id: IdType): Observable<Timetable | undefined> {
    return this.store.select(selectTimetableForId, id);
  }

  public selectStateError(): Observable<any> {
    return this.store.select(selectGeneralStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectGeneralStateInProgress;
  }

}
