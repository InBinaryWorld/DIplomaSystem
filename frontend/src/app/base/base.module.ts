import { NgModule } from '@angular/core';
import { AuthStoreModule } from './store/auth/auth-store.module';
import { SessionStoreModule } from './store/session/session-store.module';
import { UserStoreModule } from './store/user/user-store.module';
import { RequestsStoreModule } from './store/requests/requests-store.module';

@NgModule({
  declarations: [],
  imports: [
    AuthStoreModule,
    SessionStoreModule,
    UserStoreModule,
    RequestsStoreModule
  ],
  exports: [
    AuthStoreModule,
    SessionStoreModule,
    UserStoreModule,
    RequestsStoreModule
  ]
})
export class BaseModule {
}
