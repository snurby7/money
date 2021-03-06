import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BudgetAgent } from '../../agents';
import { BudgetDialogModule } from './budget-dialog/budget-dialog.module';
import { BudgetSelectionRoutingModule } from './budget-selection-routing.module';
import { BudgetComponent } from './budget.component';

@NgModule({
  declarations: [BudgetComponent],
  imports: [
    BudgetDialogModule,
    BudgetSelectionRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [BudgetComponent],
  providers: [BudgetAgent],
})
export class BudgetSelectionModule {}
