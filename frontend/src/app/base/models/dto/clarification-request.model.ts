import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';
import { Thesis } from './thesis.model';

export class ClarificationRequest extends BaseRequest {
  thesisId!: IdType;
  newTopic!: string;
  newDescription!: string;
  // additional
  baseThesis!: Thesis;
}
