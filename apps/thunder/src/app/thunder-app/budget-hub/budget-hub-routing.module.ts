import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetHubComponent } from './budget-hub.component';
import { BudgetHubLoadGuard } from './budget-hub.guard';

const routes: Routes = [
  {
    path: 'v1/:budgetId',
    component: BudgetHubComponent,
    canActivate: [BudgetHubLoadGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./hub-base/hub-base.module').then((m) => m.HubBaseModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BudgetHubLoadGuard],
})
export class BudgetHubRoutingModule {}
