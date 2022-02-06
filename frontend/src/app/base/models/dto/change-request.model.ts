import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';
import { Thesis } from './thesis.model';

export class ChangeRequest extends BaseRequest {
  oldThesisId!: IdType;
  newThesisId!: IdType;
  // needed fields
  newThesis!: Thesis;
  previousThesis!: Thesis;
}
