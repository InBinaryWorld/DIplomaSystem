import { NgModule } from '@angular/core';

import { ManagementRoutingModule } from "./management-routing.module";
import { SharedModule } from "../../shared.module";
import { ImportSystemDataComponent } from "./components/import/import-system-data.component";


@NgModule({
  declarations: [
    ImportSystemDataComponent
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule,
  ]
})
export class ManagementModule {
}
