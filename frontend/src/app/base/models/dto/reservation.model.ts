import { ReservationStatus } from './reservation-status.model';
import { WithId } from './id.model';

export interface Reservation extends WithId {
  topicId: string;
  status: ReservationStatus;
  creationDate: Date;
}
