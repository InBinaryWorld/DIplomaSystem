import { ReservationStatus } from '../../base/models/dto/reservation-status.model';
import { Role } from '../../base/models/dto/role.model';

export class TranslationKeys {
  public static forReservationStatus(status: ReservationStatus): string {
    return 'ReservationsStatus.' + status;
  }


  public static forRole(role: Role): string {
    return 'Role.' + role;
  }

}
