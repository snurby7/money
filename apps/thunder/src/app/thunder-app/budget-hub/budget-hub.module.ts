import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';
import { BudgetHubRoutingModule } from './budget-hub-routing.module';
import { BudgetHubComponent } from './budget-hub.component';
import { TransactionsModule } from './transactions';

@NgModule({
  declarations: [BudgetHubComponent],
  imports: [
    AccountModule,
    BudgetHubRoutingModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    TransactionsModule,
  ],
})
export class BudgetHubModule {}
