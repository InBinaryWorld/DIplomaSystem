import { RequestStatus } from './request-status.model';
import { IdType, WithId } from './id.model';

export interface BaseRequest extends WithId {
  submissionDate: Date;
  status: RequestStatus;
  studentId: IdType;
  employeeId: IdType;
}
