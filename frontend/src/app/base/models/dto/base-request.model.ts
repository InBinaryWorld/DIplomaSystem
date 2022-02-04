import { RequestStatus } from './request-status.model';
import { IdType, WithId } from './id.model';
import { Student } from './student.model';

export interface BaseRequest extends WithId {
  submissionDate: Date;
  status: RequestStatus;
  studentId: IdType;
  employeeId: IdType;
  // additional
  student: Student;
}
