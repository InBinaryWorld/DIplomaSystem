import { RequestStatus } from './request-status.model';
import { WithId } from './id.model';

export interface BaseRequest extends WithId {
  submissionDate: Date;
  status: RequestStatus;
  studentId: string;
  employeeId: string;
}
