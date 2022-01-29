import { BaseRequest } from './base-request.model';

export interface ChangeRequest extends BaseRequest {
  oldTopicId: string;
  newTopicId: string;
}
