import { ReservationStatus } from './reservation-status.model';
import { IdType, WithId } from './id.model';

export interface Reservation extends WithId {
  thesisId: IdType;
  status: ReservationStatus;
  creationDate: Date;
}
