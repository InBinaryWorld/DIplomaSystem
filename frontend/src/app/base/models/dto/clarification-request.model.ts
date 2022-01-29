import { BaseRequest } from './base-request.model';

export interface ClarificationRequest extends BaseRequest {
  topicId: string;
  newName: string;
  newDescription: string;
}
