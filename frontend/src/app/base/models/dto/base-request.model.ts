import { RequestStatus } from './request-state.model';

export interface BaseRequest {
  id: string;
  submissionDate: Date;
  status: RequestStatus;
  studentId: string;
  employeeId: string;
}
