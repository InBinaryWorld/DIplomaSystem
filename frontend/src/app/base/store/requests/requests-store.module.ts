import { RequestsFeatureName, requestsReducer } from './requests.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RequestsEffects } from './requests-effects.service';


@NgModule({
  imports: [
    StoreModule.forFeature(RequestsFeatureName, requestsReducer),
    EffectsModule.forFeature([RequestsEffects])
  ]
})
export class RequestsStoreModule {
}
