import { WithId } from './id.model';
import { ReservationMemberStatus } from './reservation-member-status.model';

export interface ReservationMember extends WithId {
  studentId: string;
  reservationId: string;
  status: ReservationMemberStatus;
}
