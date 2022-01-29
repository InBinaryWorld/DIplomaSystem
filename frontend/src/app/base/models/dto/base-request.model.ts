import { RequestState } from './request-state.model';

export interface BaseRequest {
  id: string;
  submissionDate: Date;
  state: RequestState;
  studentId: string;
  employeeId: string;
}
