import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { isNil } from 'lodash-es';
import { GeneralResourcesStateKey } from '../../store/general/general.state';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesApiService {
  private apiLabelMap: Dictionary<ApiLabel> = {
    [GeneralResourcesStateKey.TIMETABLES]: ApiLabel.GET_TIMETABLES,
    [GeneralResourcesStateKey.DEPARTMENTS]: ApiLabel.GET_DEPARTMENTS,
    [GeneralResourcesStateKey.FIELDS_OF_STUDY]: ApiLabel.GET_FIELDS_OF_STUDY,
    [GeneralResourcesStateKey.DIPLOMA_SESSIONS]: ApiLabel.GET_DIPLOMA_SESSIONS
  };

  constructor(private readonly http: ServerHttpService) {
  }

  getResourcesForType(resourceType: GeneralResourcesStateKey): Observable<any> {
    const apiLabel = this.apiLabelMap[resourceType];
    if (isNil(apiLabel)) {
      throw new Error('Unhandled resource type: ' + resourceType);
    }
    return this.getAllResources(apiLabel);
  }

  getResourceForId(resourceType: GeneralResourcesStateKey, id: string): Observable<any> {
    const apiLabel = this.apiLabelMap[resourceType];
    if (isNil(apiLabel)) {
      throw new Error('Unhandled resource type: ' + resourceType);
    }
    return this.getResource(apiLabel, id);
  }

  private getAllResources<T>(apiLabel: ApiLabel): Observable<T[]> {
    return this.http.getWithLabel(apiLabel);
  }

  private getResource<T>(apiLabel: ApiLabel, id: string): Observable<T> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getWithLabel(apiLabel, undefined, query);
  }

}
