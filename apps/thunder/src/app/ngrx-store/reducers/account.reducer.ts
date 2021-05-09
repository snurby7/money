import { Action, createReducer, on } from '@ngrx/store';
import {
  createNewAccount_Success,
  GetAccountList_Success,
  GetAccount_Success,
} from '../actions/account.actions';
import { IAccountState, initialAccountState } from '../state/account.state';

export const reducers = createReducer(
  initialAccountState,
  on(GetAccountList_Success, (state, { accounts }) => ({
    ...state,
    accounts,
  })),
  on(GetAccount_Success, (state, { selectedAccount }) => ({
    ...state,
    selectedAccount,
  })),
  on(createNewAccount_Success, (state, { account }) => ({
    ...state,
    accounts: [...state.accounts, account],
  }))
);

export function accountReducers(
  state: IAccountState | undefined,
  action: Action
) {
  return reducers(state, action);
}
