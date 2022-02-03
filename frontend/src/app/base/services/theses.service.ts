import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Reservation } from '../models/dto/reservation.model';
import { ThesesStoreService } from './store/theses-store.service';
import { StoreKeys } from '../utils/store-keys.utils';
import { Role } from '../models/dto/role.model';
import { Thesis } from '../models/dto/thesis.model';
import { map, tap } from 'rxjs/operators';
import { ReservationStatus } from '../models/dto/reservation-status.model';
import { filterExists } from '../../core/tools/filter-exists';
import { firstItem } from '../../core/tools/first-item';
import { isNil } from 'lodash-es';
import { LoadThesisActionOptions } from '../store/theses/theses.actions';
import { ThesesApiService } from './api/theses-api.service';
import { ThesesStateKey } from '../store/theses/theses.state';
import { IdType } from '../models/dto/id.model';

@Injectable({
  providedIn: 'root'
})
export class ThesesService {

  constructor(private readonly thesesStoreService: ThesesStoreService,
              private readonly thesesApiService: ThesesApiService) {
  }

  public invalidateTheses(): void {
    this.thesesStoreService.invalidateStoreForType(ThesesStateKey.THESES);
  }

  public getProposedByStudentTheses(studentId: IdType): Observable<Thesis[]> {
    const options = LoadThesisActionOptions.proposedByStudent(studentId);
    return this.thesesStoreService.getTheses(options);
  }

  public getThesisForId(thesisId: IdType): Observable<Thesis> {
    return this.thesesStoreService.getThesisForId(thesisId);
  }

  public getStudentReservations(studentId: IdType): Observable<Reservation[]> {
    const key = StoreKeys.forUserRole({ id: studentId, role: Role.STUDENT });
    return this.thesesStoreService.getStudentReservations(studentId, key).pipe(filterExists());
  }

  public getReservationForId(reservationId: IdType): Observable<Reservation> {
    return this.thesesStoreService.getReservationForId(reservationId);
  }

  public getConfirmedReservationsForStudentId(studentId: IdType): Observable<Reservation[]> {
    return this.getStudentReservations(studentId).pipe(
      map(reservations => reservations.filter(r => r.status === ReservationStatus.CONFIRMED))
    );
  }

  public getActiveConfirmedReservationForStudentId(studentId: IdType): Observable<Reservation | undefined> {
    return this.getConfirmedReservationsForStudentId(studentId).pipe(
      // TODO:
      // map(reservations => reservations.first(r => !this.inactiveThesisStates.includes(r.thesis.status))),
      map(reservations => firstItem(reservations))
    );
  }

  public getActiveReservedThesisForStudentId(studentId: IdType): Observable<Thesis | undefined> {
    return this.getActiveConfirmedReservationForStudentId(studentId).pipe(
      switchMap(r => isNil(r) ? of(undefined) : this.getThesisForId(r.thesisId))
    );
  }

  public createThesis(thesis: Partial<Thesis>): Observable<Thesis> {
    return this.thesesApiService.createThesis(thesis)
      .pipe(tap(() => this.invalidateTheses()));
  }

  // public getActiveReservedThesisForStudentId(studentId: IdType): Observable<[Thesis, Reservation] | undefined> {
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
