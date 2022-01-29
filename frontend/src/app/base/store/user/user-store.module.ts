import { UserFeatureName, userReducer } from './user.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './user.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(UserFeatureName, userReducer),
    EffectsModule.forFeature([userEffects])
  ]
})
export class UserStoreModule {
}
