import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICreateAccount, SupportedAccountType } from '@snurbco/contracts';

type AccountDialogComponentData = { budgetId: string | null };

@Component({
  selector: 'snurbco-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDialogComponent {
  public readonly AccountTypes = SupportedAccountType;
  private readonly budgetId: string | null = null;
  public accountName = '';
  public accountType = SupportedAccountType.Savings;
  public accountBalance = 0;
  constructor(
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogComponentData
  ) {
    this.budgetId = data.budgetId;
  }

  public submitForm(): void {
    if (this.budgetId) {
      const newAccount: ICreateAccount = {
        name: this.accountName,
        type: this.accountType,
        balance: this.accountBalance,
        budgetId: this.budgetId,
      };
      this.dialogRef.close(newAccount);
      return;
    }
    this.dialogRef.close();
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }
}
