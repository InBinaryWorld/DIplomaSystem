import { NgModule } from '@angular/core';
import { AuthStoreModule } from './store/auth/auth-store.module';
import { SessionStoreModule } from './store/session/session-store.module';
import { UserStoreModule } from './store/user/user-store.module';

@NgModule({
  declarations: [],
  imports: [
    AuthStoreModule,
    SessionStoreModule,
    UserStoreModule
  ],
  exports: [
    AuthStoreModule,
    SessionStoreModule,
    UserStoreModule
  ]
})
export class BaseModule {
}
