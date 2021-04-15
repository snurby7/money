import { IBudgetQuery } from '@snurbco/contracts';

/**
 * Query object to get a set list of budgets
 *
 * @export
 * @class BudgetQuery
 * @implements {IBudgetQuery}
 */
export class BudgetQuery implements IBudgetQuery {
  limit?: number;
}
