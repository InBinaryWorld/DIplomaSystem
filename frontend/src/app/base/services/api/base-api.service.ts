import { ApiLabel } from '../../../core/models/api-route.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { isNil } from 'lodash-es';

export abstract class BaseApiService {

  protected getApiLabel(map: Dictionary<ApiLabel>, key: string): ApiLabel {
    const apiLabel = map[key];
    if (isNil(apiLabel)) {
      throw new Error('Unhandled resource type: ' + key);
    }
    return apiLabel;
  }

}
