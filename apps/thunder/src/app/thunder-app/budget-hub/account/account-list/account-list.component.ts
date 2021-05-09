import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAccount, IBudget, ICreateAccount } from '@snurbco/contracts';
import { Observable } from 'rxjs';
import {
  createNewAccount,
  GetAccountList,
} from '../../../../ngrx-store/actions/account.actions';
import { selectAccountList } from '../../../../ngrx-store/selectors/account.selectors';
import { selectSelectedBudget } from '../../../../ngrx-store/selectors/budget.selectors';
import { IMammothState } from '../../../../ngrx-store/state/mammoth.state';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';

@Component({
  selector: 'snurbco-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  public accounts$: Observable<IAccount[]>;
  private _selectedBudget: IBudget | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _store: Store<IMammothState>,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this._store
      .pipe(select(selectSelectedBudget))
      .subscribe((selectedBudget) => (this._selectedBudget = selectedBudget));
    this.accounts$ = this._store.pipe(select(selectAccountList));
  }

  public ngOnInit(): void {
    this._store.dispatch(GetAccountList());
  }

  public viewAccount(account: IAccount): void {
    this._router.navigate(['account', account.id], {
      relativeTo: this.activatedRoute,
    });
  }

  public createNewAccount(): void {
    this._dialog
      .open(AccountDialogComponent, {
        data: { budgetId: this._selectedBudget?.id ?? null },
      })
      .afterClosed()
      .subscribe((newAccount: ICreateAccount | null) => {
        if (newAccount) {
          this._store.dispatch(createNewAccount({ account: newAccount }));
        }
      });
  }
}
