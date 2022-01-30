import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { GeneralResourceType } from '../../models/general-store-key.model';
import { RequestParams } from '../../../core/models/request-param.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { isNil } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class GeneralResourcesApiService {
  private apiLabelMap: Dictionary<ApiLabel> = {
    [GeneralResourceType.TIMETABLES]: ApiLabel.GET_TIMETABLES,
    [GeneralResourceType.DEPARTMENTS]: ApiLabel.GET_DEPARTMENTS,
    [GeneralResourceType.FIELDS_OF_STUDY]: ApiLabel.GET_FIELDS_OF_STUDY,
    [GeneralResourceType.DIPLOMA_SESSIONS]: ApiLabel.GET_DIPLOMA_SESSIONS
  };

  constructor(private readonly http: ServerHttpService) {
  }

  getAllResourcesForType(resourceType: GeneralResourceType): Observable<any> {
    const apiLabel = this.apiLabelMap[resourceType];
    if (isNil(apiLabel)) {
      throw new Error('Unhandled resource type: ' + resourceType);
    }
    return this.getAllResources(apiLabel);
  }

  getResourceForTypeAndId(resourceType: GeneralResourceType, id: string): Observable<any> {
    const apiLabel = this.apiLabelMap[resourceType];
    if (isNil(apiLabel)) {
      throw new Error('Unhandled resource type: ' + resourceType);
    }
    return this.getResourceForId(apiLabel, id);
  }

  private getAllResources<T>(apiLabel: ApiLabel): Observable<T[]> {
    return this.http.getWithLabel(apiLabel);
  }

  private getResourceForId<T>(apiLabel: ApiLabel, id: string): Observable<T> {
    const query = new RequestParams();
    query.addIfValueExists('id', id);
    return this.http.getWithLabel(apiLabel, undefined, query);
  }

}
