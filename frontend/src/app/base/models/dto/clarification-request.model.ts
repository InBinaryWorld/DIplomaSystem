import { BaseRequest } from './base-request.model';
import { IdType } from './id.model';
import { Employee } from './employee.model';
import { Thesis } from './thesis.model';

export interface ClarificationRequest extends BaseRequest {
  thesisId: IdType;
  newTopic: string;
  newDescription: string;
  // additional
  baseThesis: Thesis;
  supervisor: Employee;
}
