import { Injectable } from '@angular/core';
import { GeneralResourcesStateKey } from '../store/general/general.state';
import { GeneralResourcesStoreService } from './store/general-store.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesService {

  private publicKey = 'PUBLIC';


  constructor(private readonly generalResourcesStoreService: GeneralResourcesStoreService) {
  }

  public invalidateAllGeneralResources(): void {
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.FIELDS_OF_STUDY);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DEPARTMENTS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.DIPLOMA_SESSIONS);
    this.generalResourcesStoreService.invalidateStoreForKey(GeneralResourcesStateKey.TIMETABLES);
  }


}
