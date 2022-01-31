import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Reservation } from '../models/dto/reservation.model';
import { ThesesStoreService } from './store/theses-store.service';
import { StoreKeys } from '../../core/utils/store-keys.utils';
import { Role } from '../models/dto/role.model';
import { UserRole } from '../models/dto/user-role.model';
import { Thesis } from '../models/dto/thesis.model';
import { map } from 'rxjs/operators';
import { ReservationStatus } from '../models/dto/reservation-status.model';
import { ThesisStatus } from '../models/dto/topic-status.model';
import { filterExists } from '../../core/tools/filter-exists';
import { firstItem } from '../../core/tools/first-item';
import { isNil } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ThesesService {

  private inactiveThesisStates = [
    ThesisStatus.REJECTED_BY_LECTURER,
    ThesisStatus.REJECTED_BY_COMMITTEE,
    ThesisStatus.REJECTED_BY_COORDINATOR
  ];

  constructor(private readonly reservationsStoreService: ThesesStoreService) {
  }

  public getThesesForUserRole(userRole: UserRole): Observable<Thesis[] | undefined> {
    const key = StoreKeys.forUserRole(userRole);
    return this.reservationsStoreService.getThesesForUserRole(userRole, key);
  }

  public getThesisForId(thesisId: string): Observable<Thesis | undefined> {
    return this.reservationsStoreService.getThesisForId(thesisId);
  }

  public getStudentReservations(studentId: string): Observable<Reservation[]> {
    const key = StoreKeys.forUserRole({ id: studentId, role: Role.STUDENT });
    return this.reservationsStoreService.getStudentReservations(studentId, key).pipe(filterExists());
  }

  public getReservationForId(reservationId: string): Observable<Reservation | undefined> {
    return this.reservationsStoreService.getReservationForId(reservationId);
  }

  public getConfirmedReservationsForStudentId(studentId: string): Observable<Reservation[]> {
    return this.getStudentReservations(studentId).pipe(
      map(reservations => reservations.filter(r => r.status === ReservationStatus.CONFIRMED))
    );
  }

  public getActiveConfirmedReservationForStudentId(studentId: string): Observable<Reservation | undefined> {
    return this.getConfirmedReservationsForStudentId(studentId).pipe(
      // TODO:
      // map(reservations => reservations.first(r => !this.inactiveThesisStates.includes(r.thesis.status))),
      map(reservations => firstItem(reservations))
    );
  }

  public getActiveReservedThesisForStudentId(studentId: string): Observable<Thesis | undefined> {
    return this.getActiveConfirmedReservationForStudentId(studentId).pipe(
      switchMap(r => isNil(r) ? of(undefined) : this.getThesisForId(r.thesisId))
    );
  }

  // public getActiveReservedThesisForStudentId(studentId: string): Observable<[Thesis, Reservation] | undefined> {
  //   return this.getConfirmedReservationsForStudentId(studentId).pipe(
  //     switchMap(reservations => isEmpty(reservations)
  //       ? of(undefined)
  //       : combineLatest(reservations!.map(r => this.getThesisForId(r.thesisId).pipe(filterExists()))).pipe(
  //         map(theses => theses.find(t => !this.inactiveThesisStates.includes(t!.status))),
  //         map(thesis => isNil(thesis)
  //           ? undefined
  //           : ([thesis, reservations!.find(r => r.thesisId === thesis.id)] as [Thesis, Reservation])
  //         )
  //       )
  //     )
  //   );
  // }

}
