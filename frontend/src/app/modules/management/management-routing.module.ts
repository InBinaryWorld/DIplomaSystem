import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportSystemDataComponent } from "./components/import/import-system-data.component";

const routes: Routes = [
  {
    path: 'management',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'import',
      },
      {
        path: 'import',
        component: ImportSystemDataComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
