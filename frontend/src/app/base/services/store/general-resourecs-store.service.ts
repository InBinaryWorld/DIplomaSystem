import { Injectable } from '@angular/core';
import { Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app-state.model';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import { Dictionary } from '../../../core/models/dictionary.model';
import { map } from 'rxjs/operators';
import { RequestsApiService } from '../api/requests-api.service';
import {
  invalidateGeneralResourcesAction,
  loadGeneralResourcesAction,
  loadGeneralResourcesIfNeededAction
} from '../../store/general/general.actions';
import { GeneralResourceType } from '../../models/general-store-key.model';
import {
  selectGeneralState,
  selectGeneralStateError,
  selectGeneralStateInProgress,
  selectResourcesById
} from '../../store/general/general.selectors';
import { GeneralState } from '../../store/general/general.state';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesStoreService extends CleanableStoreService {

  constructor(private readonly requestsService: RequestsApiService,
              store: Store<AppState>) {
    super(store);
  }

  public invalidateGeneralResources(): void {
    this.store.dispatch(invalidateGeneralResourcesAction());
  }

  public loadResources(resourceType: GeneralResourceType, ifNeededOnly = true): void {
    const action = ifNeededOnly
      ? loadGeneralResourcesIfNeededAction({ resourceType })
      : loadGeneralResourcesAction({ resourceType });
    this.store.dispatch(action);
  }

  public getResourcesByIdForType<T>(resourceType: GeneralResourceType, ifNeededOnly = true)
    : Observable<Dictionary<T>> {
    this.loadResources(resourceType, ifNeededOnly);
    return this.store.select(selectResourcesById, resourceType);
  }

  public getResourcesForType<T>(resourceType: GeneralResourceType, ifNeededOnly = true)
    : Observable<T[]> {
    return this.getResourcesByIdForType<T>(resourceType, ifNeededOnly)
      .pipe(map(resourcesById => Object.values(resourcesById)));
  }

  public getResourcesForTypeAndId<T>(resourceType: GeneralResourceType, id: string, ifNeededOnly = true)
    : Observable<T | undefined> {
    return this.getResourcesByIdForType<T>(resourceType, ifNeededOnly)
      .pipe(map(resources => resources[id]));
  }

  public getUserState(): Observable<GeneralState> {
    return this.store.select(selectGeneralState);
  }

  public getProgressSelector(): Selector<AppState, boolean> {
    return selectGeneralStateInProgress;
  }

  public getError(): Observable<any> {
    return this.store.select(selectGeneralStateError);
  }

}
