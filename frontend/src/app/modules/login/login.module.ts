import { NgModule } from '@angular/core';

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { SharedModule } from "../shared/shared.module";
import { SessionStoreModule } from "./store/session-store.module";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    SessionStoreModule
  ]
})
export class LoginModule {
}
