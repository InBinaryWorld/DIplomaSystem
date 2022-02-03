import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';
import { Employee } from './employee.model';
import { Thesis } from './thesis.model';

export interface ChangeRequest extends BaseRequest {
  oldThesisId: IdType;
  newThesisId: IdType;
  // needed fields
  supervisor: Employee;
  newThesis: Thesis;
  previousThesis: Thesis;
}
