import { createAction, props } from '@ngrx/store';
import { IAccount, ICreateAccount } from '@snurbco/contracts';

export enum EAccountAction {
  GetAccountList = '[Account] Get Account List',
  GetAccountList_Success = '[Account] Get Account List Success',
  GetAccount = '[Account] Get Account',
  GetAccount_Success = '[Account] Get Account Success',
  DeleteAccount = '[Account] Delete Account',
  DeleteAccount_Success = '[Account] Delete Account Success',
  CreateAccount = '[Account] Create Account',
  CreateAccount_Success = '[Account] Create Account Success',
}

// Get many accounts.
export const GetAccountList = createAction(EAccountAction.GetAccountList);
export const GetAccountList_Success = createAction(
  EAccountAction.GetAccountList_Success,
  props<{ accounts: IAccount[] }>()
);

// Get a single account
export const GetAccount = createAction(
  EAccountAction.GetAccount_Success,
  props<{ accountId: string }>()
);
export const GetAccount_Success = createAction(
  EAccountAction.GetAccount_Success,
  props<{ selectedAccount: IAccount }>()
);

// Create a new account
export const createNewAccount = createAction(
  EAccountAction.CreateAccount,
  props<{ account: ICreateAccount }>()
);
export const createNewAccount_Success = createAction(
  EAccountAction.CreateAccount_Success,
  props<{ account: IAccount }>()
);
