import { ReservationStatus } from "./reservation-status.model";

export interface Reservation {
  id: string;
  status: ReservationStatus;
  creationDate: Date;
  topicId: string;
}
