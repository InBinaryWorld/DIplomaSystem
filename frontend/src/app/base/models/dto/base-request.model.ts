import { RequestStatus } from './request-status.model';
import { IdType, IdTypeSerializer, WithId } from './id.model';
import { Student } from './student.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class BaseRequest extends WithId {

  @autoserializeAs(Date)
  submissionDate!: Date;

  @autoserializeAs(RequestStatus)
  status!: RequestStatus;

  @autoserializeAs(IdTypeSerializer)
  studentId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  employeeId?: IdType;

  @autoserializeAs(Student)
  student!: Student;
}
