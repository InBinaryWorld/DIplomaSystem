import { NgModule } from '@angular/core';
import { AuthStoreModule } from './store/auth/auth-store.module';
import { SessionStoreModule } from './store/session/session-store.module';
import { UserStoreModule } from './store/user/user-store.module';
import { RequestsStoreModule } from './store/requests/requests-store.module';
import { GeneralResourcesStoreModule } from './store/general/general-store.module';
import { ReservationsStoreModule } from './store/reservations/reservations-store.module';

@NgModule({
  declarations: [],
  imports: [
    AuthStoreModule,
    SessionStoreModule,
    UserStoreModule,
    RequestsStoreModule,
    GeneralResourcesStoreModule,
    ReservationsStoreModule
  ],
  exports: [
    AuthStoreModule,
    SessionStoreModule,
    UserStoreModule,
    RequestsStoreModule,
    GeneralResourcesStoreModule,
    ReservationsStoreModule
  ]
})
export class BaseModule {
}
