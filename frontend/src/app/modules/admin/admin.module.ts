import { NgModule } from '@angular/core';

import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ImportSystemDataComponent } from "./components/import/import-system-data.component";
import { AdminComponent } from "./components/admin/admin.component";


@NgModule({
  declarations: [
    AdminComponent,
    ImportSystemDataComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {
}
