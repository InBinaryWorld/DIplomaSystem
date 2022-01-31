import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationsFeatureName } from './reservations.reducer';
import { ReservationsState, ReservationsStateKey, ReservationsType } from './reservations.state';
import { AppState } from '../app-state.model';
import { forIdSelector, forKeySelector, StoreResource } from '../../../core/store/base-store-state.model';
import { Reservation } from '../../models/dto/reservation.model';

export const selectReservationsState = createFeatureSelector<ReservationsState>(ReservationsFeatureName);
export const selectReservationsStateInProgress = createSelector(selectReservationsState, state => state.isInProgress);
export const selectReservationsStateError = createSelector(selectReservationsState, state => state.error);

export const selectReservationsStoreResource = createSelector(selectReservationsState, state => state[ReservationsStateKey.RESERVATIONS]);
export const selectReservationsForKey = createSelector<AppState, string, StoreResource<Reservation>, Reservation[] | undefined>(
  selectReservationsStoreResource, forKeySelector
);
export const selectReservationForId = createSelector<AppState, string, StoreResource<Reservation>, Reservation | undefined>(
  selectReservationsStoreResource, forIdSelector
);

// For Effect
export const selectReservationsDataForTypeAndId = createSelector<AppState, { resourceType: ReservationsStateKey, id: string }, ReservationsState, ReservationsType | undefined>(
  selectReservationsState, (state, { resourceType, id }) => state[resourceType].cachedById[id]
);
export const selectReservationsDataIdsForTypeAndKey = createSelector<AppState, { resourceType: ReservationsStateKey, key: string }, ReservationsState, string[] | undefined>(
  selectReservationsState, (state, { resourceType, key }) => state[resourceType].idsByKey[key]
);
