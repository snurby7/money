import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./thunder-app/features.module').then((m) => m.FeaturesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'getting-started',
    loadChildren: () =>
      import('./pages/getting-started/getting-started.module').then(
        (m) => m.GettingStartedModule
      ),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./pages/features/features.module').then((m) => m.FeaturesModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
