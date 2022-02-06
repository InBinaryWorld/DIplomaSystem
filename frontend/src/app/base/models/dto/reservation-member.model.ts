import { IdType, WithId } from './id.model';
import { ReservationMemberStatus } from './reservation-member-status.model';
import { Student } from './student.model';

export class ReservationMember extends WithId {
  studentId!: IdType;
  reservationId!: IdType;
  status!: ReservationMemberStatus;
  // additionall
  student!: Student;
}
