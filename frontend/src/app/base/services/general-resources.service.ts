import { Injectable } from '@angular/core';
import { GeneralResourcesStateKey } from '../store/general/general.state';
import { GeneralResourcesStoreService } from './store/general-store.service';
import { Observable } from 'rxjs';
import { Timetable } from '../models/dto/timetable.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesService {

  constructor(private readonly generalResourcesStoreService: GeneralResourcesStoreService) {
  }

  public invalidateAllGeneralResources(): void {
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.FIELDS_OF_STUDY);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DEPARTMENTS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DIPLOMA_SESSIONS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.TIMETABLES);
  }

  public getTimetables(ifNeededOnly = true): Observable<Timetable[] | undefined> {
    this.generalResourcesStoreService.loadResources(GeneralResourcesStateKey.TIMETABLES, ifNeededOnly);
    return this.generalResourcesStoreService.selectTimetables();
  }

  public getTimetableForId(id: string, ifNeededOnly = true): Observable<Timetable | undefined> {
    this.generalResourcesStoreService.loadResourceForId(GeneralResourcesStateKey.TIMETABLES, id, ifNeededOnly);
    return this.generalResourcesStoreService.selectTimetableForId(id);
  }

}
