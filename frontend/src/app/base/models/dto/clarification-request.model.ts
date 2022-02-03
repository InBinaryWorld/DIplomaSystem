import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';

export interface ClarificationRequest extends BaseRequest {
  thesisId: IdType;
  newTopic: string;
  newDescription: string;
  // Current/Old topic and description
  currentTopic: string;
  currentDescription: string;
  // supervisor full name
  supervisorName: string;
}
