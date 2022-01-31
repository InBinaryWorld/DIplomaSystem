import { BaseStoreState, StoreResource } from '../../../core/store/base-store-state.model';
import { Reservation } from '../../models/dto/reservation.model';

export type ReservationsType = Reservation;

export enum ReservationsStateKey {
  RESERVATIONS = 'RESERVATIONS'
}

export class ReservationsState extends BaseStoreState {
  [ReservationsStateKey.RESERVATIONS] = new StoreResource<Reservation>();
}
