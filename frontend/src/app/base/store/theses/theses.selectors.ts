import { createFeatureSelector, createSelector } from '@ngrx/store';
import { thesesFeatureName } from './theses.reducer';
import { ThesesState, ThesesStateKey, ThesesStoreType } from './theses.state';
import { AppState } from '../app-state.model';
import { forIdSelector, forKeySelector, StoreResource } from '../../../core/store/base-store-state.model';
import { Reservation } from '../../models/dto/reservation.model';
import { Thesis } from '../../models/dto/thesis.model';
import { IdType } from '../../models/dto/id.model';

export const selectThesesState = createFeatureSelector<ThesesState>(thesesFeatureName);
export const selectThesesStateInProgress = createSelector(selectThesesState, state => state.isInProgress);
export const selectThesesStateError = createSelector(selectThesesState, state => state.error);

export const selectReservationsStoreResource = createSelector(selectThesesState, state => state[ThesesStateKey.RESERVATIONS]);
export const selectReservationsForKey = createSelector<AppState, string, StoreResource<Reservation>, Reservation[] | undefined>(
  selectReservationsStoreResource, forKeySelector
);
export const selectReservationForId = createSelector<AppState, string, StoreResource<Reservation>, Reservation | undefined>(
  selectReservationsStoreResource, forIdSelector
);

export const selectThesesStoreResource = createSelector(selectThesesState, state => state[ThesesStateKey.THESES]);
export const selectThesesForKey = createSelector<AppState, string, StoreResource<Thesis>, Thesis[] | undefined>(
  selectThesesStoreResource, forKeySelector
);
export const selectThesisForId = createSelector<AppState, string, StoreResource<Thesis>, Thesis | undefined>(
  selectThesesStoreResource, forIdSelector
);

// For Effect
export const selectThesesDataForTypeAndId = createSelector<AppState, { resourceType: ThesesStateKey, id: IdType }, ThesesState, ThesesStoreType | undefined>(
  selectThesesState, (state, { resourceType, id }) => state[resourceType].cachedById[id]
);
export const selectThesesDataIdsForTypeAndKey = createSelector<AppState, { resourceType: ThesesStateKey, key: string }, ThesesState, string[] | undefined>(
  selectThesesState, (state, { resourceType, key }) => state[resourceType].idsByKey[key]
);
