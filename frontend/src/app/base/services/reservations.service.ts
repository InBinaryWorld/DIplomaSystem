import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationApiService } from './api/reservation-api.service';
import { Reservation } from '../models/dto/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  constructor(private readonly reservationApiService: ReservationApiService) {
  }

  public getReservationsForStudentId(studentId: string): Observable<Reservation[]> {
    return this.reservationApiService.getReservationsForStudentId(studentId);
  }

}
