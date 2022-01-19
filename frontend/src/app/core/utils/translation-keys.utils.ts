import { ReservationStatus } from "../../modules/shared/dto/reservation-status.model";

export class TranslationKeys {
  public static forReservationStatus(status: ReservationStatus): string {
    return "ReservationsStatus." + status;
  }
}
