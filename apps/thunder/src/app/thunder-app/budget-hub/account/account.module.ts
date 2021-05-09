import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TransactionsModule } from '../transactions';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountDetailComponent,
    AccountDialogComponent,
  ],
  exports: [AccountListComponent, AccountDetailComponent],
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TransactionsModule,
  ],
})
export class AccountModule {}
