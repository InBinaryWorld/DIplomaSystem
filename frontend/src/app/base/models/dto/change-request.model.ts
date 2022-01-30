import { BaseRequest } from './base-request.model';

export interface ChangeRequest extends BaseRequest {
  oldThesisId: string;
  newThesisId: string;
}
