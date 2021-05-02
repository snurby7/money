import { IBudget } from '@snurbco/contracts';

export interface IBudgetState {
  budgets: IBudget[];
  selectedBudget: IBudget | null;
}

export const initialBudgetState: IBudgetState = {
  budgets: [],
  selectedBudget: null,
};
