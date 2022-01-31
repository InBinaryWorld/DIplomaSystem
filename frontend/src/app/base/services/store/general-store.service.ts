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

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesStoreService extends CleanableStoreService {

  private publicKey = 'PUBLIC';

  constructor(store: Store<AppState>) {
    super(store);
  }

  public invalidateStoreForKey(resourceType: GeneralResourcesStateKey): void {
    this.store.dispatch(invalidateGeneralResourcesAction({ resourceType }));
  }

  public loadResources(resourceType: GeneralResourcesStateKey, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadGeneralResourcesIfNeededAction({ resourceType, key: this.publicKey })
      : loadGeneralResourcesAction({ resourceType, key: this.publicKey });
    this.store.dispatch(action);
  }

  public loadResourceForId(resourceType: GeneralResourcesStateKey, id: string, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadGeneralResourceForIdIfNeededAction({ resourceType, id })
      : loadGeneralResourceForIdAction({ resourceType, id });
    this.store.dispatch(action);
  }

  public selectDepartments(): Observable<Department[] | undefined> {
    return this.store.select(selectDepartmentsForKey, this.publicKey);
  }

  public selectDepartmentForId(id: string): Observable<Department | undefined> {
    return this.store.select(selectDepartmentForId, id);
  }

  public selectFieldsOfStudy(): Observable<FieldOfStudy[] | undefined> {
    return this.store.select(selectFieldsOfStudyForKey, this.publicKey);
  }

  public selectFieldOfStudyForId(id: string): Observable<FieldOfStudy | undefined> {
    return this.store.select(selectFieldOfStudyForId, id);
  }

  public selectDiplomaSessions(): Observable<DiplomaSession[] | undefined> {
    return this.store.select(selectDiplomaSessionsForKey, this.publicKey);
  }

  public selectDiplomaSessionForId(id: string): Observable<DiplomaSession | undefined> {
    return this.store.select(selectDiplomaSessionForId, id);
  }

  public selectTimetables(): Observable<Timetable[] | undefined> {
    return this.store.select(selectTimetablesForKey, this.publicKey);
  }

  public selectTimetableForId(id: string): Observable<Timetable | undefined> {
    return this.store.select(selectTimetableForId, id);
  }

  public selectStateError(): Observable<any> {
    return this.store.select(selectGeneralStateError);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectGeneralStateInProgress;
  }

}
