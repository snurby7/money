import { IAccount } from '@snurbco/contracts';

export interface IAccountState {
  accounts: IAccount[];
  selectedAccount: IAccount | null;
}

export const initialAccountState: IAccountState = {
  accounts: [],
  selectedAccount: null,
};
