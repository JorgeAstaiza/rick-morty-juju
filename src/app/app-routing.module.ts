import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/catalogue/catalogue.module').then(
        (m) => m.CatalogueModule
      ),
  },
  {
    path: 'details',
    loadComponent: () =>
      import('./pages/catalogue/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
