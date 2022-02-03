import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';

export interface ClarificationRequest extends BaseRequest {
  thesisId: IdType;
  newTopic: string;
  newDescription: string;
}
