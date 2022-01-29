import { BaseStoreState } from '../../../core/store/base-store-state.model';
import { Dictionary } from '../../../core/models/dictionary.model';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';

export class RequestsStateByKey {
  clarificationRequests?: ClarificationRequest[];
}

export class RequestsState extends BaseStoreState {
  stateByKey: Dictionary<RequestsStateByKey> = {};
}
