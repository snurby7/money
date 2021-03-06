import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AccountAgent } from '../../agents';
import { createNewAccount, EAccountAction } from '../actions/account.actions';
import { selectSelectedBudget } from '../selectors/budget.selectors';
import { IMammothState } from '../state/mammoth.state';

@Injectable()
export class AccountEffects {
  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EAccountAction.GetAccountList),
      withLatestFrom(this._store.pipe(select(selectSelectedBudget))),
      mergeMap(([_, budget]) =>
        this.accountAgent.getAccounts(budget?.id).pipe(
          map((accounts) => ({
            type: EAccountAction.GetAccountList_Success,
            accounts,
          }))
          // catchError(() => of({ type: EAccountAction.GetAccounts_Fail }))
        )
      )
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNewAccount),
      switchMap(({ account }) =>
        this.accountAgent.createAccount(account.budgetId, account).pipe(
          map((account) => ({
            type: EAccountAction.CreateAccount_Success,
            account,
          }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _store: Store<IMammothState>,
    private accountAgent: AccountAgent
  ) {}
}
