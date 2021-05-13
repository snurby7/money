import { RouterReducerState } from '@ngrx/router-store';
import { IAccountState, initialAccountState } from './account.state';
import { IBudgetState, initialBudgetState } from './budget.state';
import { ICategoryState, initialCategoryState } from './category.state';

export interface IMammothState {
  router?: RouterReducerState;
  budgets: IBudgetState;
  accounts: IAccountState;
  category: ICategoryState;
}

export const initialMammothState: IMammothState = {
  budgets: initialBudgetState,
  accounts: initialAccountState,
  category: initialCategoryState,
};

export function getInitialMammothState(): IMammothState {
  return initialMammothState;
}
