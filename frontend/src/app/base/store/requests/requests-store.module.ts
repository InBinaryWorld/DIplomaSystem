import { RequestsFeatureName, requestsReducer } from './requests.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { requestsEffects } from './requests.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(RequestsFeatureName, requestsReducer),
    EffectsModule.forFeature([requestsEffects])
  ]
})
export class RequestsStoreModule {
}
