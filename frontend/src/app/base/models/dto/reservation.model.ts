import { ReservationStatus } from './reservation-status.model';

export interface Reservation {
  id: string;
  topicId: string;
  status: ReservationStatus;
  creationDate: Date;
}
