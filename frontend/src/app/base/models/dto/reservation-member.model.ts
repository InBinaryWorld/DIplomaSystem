import { IdType, WithId } from './id.model';
import { ReservationMemberStatus } from './reservation-member-status.model';

export interface ReservationMember extends WithId {
  studentId: IdType;
  reservationId: IdType;
  status: ReservationMemberStatus;
}
