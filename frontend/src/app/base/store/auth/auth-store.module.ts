import { AuthFeatureName, authReducer } from './auth.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(AuthFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthStoreModule {
}
