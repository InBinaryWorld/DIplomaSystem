import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { GeneralResourcesStateKey, GeneralResourceType } from '../../store/general/general.state';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesApiService extends BaseApiService {
  private resourcesApiLabelMap: Dictionary<ApiLabel> = {
    [GeneralResourcesStateKey.TIMETABLES]: ApiLabel.GET_TIMETABLES,
    [GeneralResourcesStateKey.DEPARTMENTS]: ApiLabel.GET_DEPARTMENTS,
    [GeneralResourcesStateKey.FIELDS_OF_STUDY]: ApiLabel.GET_FIELDS_OF_STUDY,
    [GeneralResourcesStateKey.DIPLOMA_SESSIONS]: ApiLabel.GET_DIPLOMA_SESSIONS
  };
  private resourceApiLabelMap: Dictionary<ApiLabel> = {
    [GeneralResourcesStateKey.TIMETABLES]: ApiLabel.GET_TIMETABLE,
    [GeneralResourcesStateKey.DEPARTMENTS]: ApiLabel.GET_DEPARTMENT,
    [GeneralResourcesStateKey.FIELDS_OF_STUDY]: ApiLabel.GET_FIELD_OF_STUDY,
    [GeneralResourcesStateKey.DIPLOMA_SESSIONS]: ApiLabel.GET_DIPLOMA_SESSION
  };

  constructor(private readonly http: ServerHttpService) {
    super();
  }

  getResourcesForType(resourceType: GeneralResourcesStateKey): Observable<GeneralResourceType[]> {
    const apiLabel = this.getApiLabel(this.resourcesApiLabelMap, resourceType);
    return this.http.getWithLabel(apiLabel);
  }

  getResourceForId(resourceType: GeneralResourcesStateKey, id: string): Observable<GeneralResourceType> {
    const apiLabel = this.getApiLabel(this.resourceApiLabelMap, resourceType);
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getWithLabel(apiLabel, undefined, query);
  }

}
