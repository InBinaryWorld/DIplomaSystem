import { GeneralFeatureName, generalResourcesReducer } from './general.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GeneralResourcesEffects } from './general.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(GeneralFeatureName, generalResourcesReducer),
    EffectsModule.forFeature([GeneralResourcesEffects])
  ]
})
export class GeneralResourcesStoreModule {
}
