import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/dto/reservation.model';
import { ReservationsStoreService } from './store/reservations-store.service';
import { StoreKeys } from '../../core/utils/store-keys.utils';
import { Role } from '../models/dto/role.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private readonly reservationsStoreService: ReservationsStoreService) {
  }

  public getReservationsForStudentId(studentId: string): Observable<Reservation[] | undefined> {
    const key = StoreKeys.forUserRole({ id: studentId, role: Role.STUDENT });
    this.reservationsStoreService.loadStudentReservations(studentId, key);
    return this.reservationsStoreService.selectReservationsForKey(key);
  }

  public getReservationForId(reservationId: string): Observable<Reservation | undefined> {
    this.reservationsStoreService.loadReservationForId(reservationId);
    return this.reservationsStoreService.selectReservationForId(reservationId);
  }

}
