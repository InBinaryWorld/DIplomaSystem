import { ReservationsFeatureName, reservationsReducer } from './reservations.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReservationsEffects } from './reservations.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(ReservationsFeatureName, reservationsReducer),
    EffectsModule.forFeature([ReservationsEffects])
  ]
})
export class ReservationsStoreModule {
}
