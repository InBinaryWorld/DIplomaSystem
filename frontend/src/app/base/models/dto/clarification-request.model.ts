import { BaseRequest } from './base-request.model';

export interface ClarificationRequest extends BaseRequest {
  thesisId: string;
  newTopic: string;
  newDescription: string;
}
