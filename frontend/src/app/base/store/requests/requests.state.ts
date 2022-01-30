import { BaseStoreState, StoreResource } from '../../../core/store/base-store-state.model';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';
import { ChangeRequest } from '../../models/dto/change-request.model';

export type RequestStoreResourceType = ClarificationRequest | ChangeRequest;

export enum RequestsStoreType {
  CLARIFICATION = 'CLARIFICATION',
  CHANGE = 'CHANGE',
}

export class RequestsState extends BaseStoreState {
  [RequestsStoreType.CLARIFICATION] = new StoreResource<ClarificationRequest>();
  [RequestsStoreType.CHANGE] = new StoreResource<ChangeRequest>();
}
