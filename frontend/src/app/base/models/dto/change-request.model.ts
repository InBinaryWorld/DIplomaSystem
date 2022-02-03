import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';

export interface ChangeRequest extends BaseRequest {
  oldThesisId: IdType;
  newThesisId: IdType;
}
