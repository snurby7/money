import { IDateModel } from '../common';
import type { ITransactionDetailLinks } from './transaction-detail-links.interface';

export interface ITransactionDetail extends ITransactionDetailLinks {
  /**
   * Unique ID for the transaction
   *
   * @type {string}
   * @memberof ITransactionDetail
   */
  id: string;
  /**
   * Will link you to the budget node
   *
   * @type {string}
   * @memberof ITransactionDetail
   */
  budgetId: string;
  /**
   * This will let you know when the transaction was last updated
   *
   * @type {IDateModel}
   * @memberof ITransactionDetail
   */
  date: IDateModel;
  /**
   * This will let you know when the transaction was first created
   *
   * @type {IDateModel}
   * @memberof ITransactionDetail
   */
  createdDate: IDateModel;
  /**
   * How much was put into the budget
   *
   * @type {number}
   * @memberof ITransactionDetail
   */
  inflow?: number;
  /**
   * How much was taken out of the budget
   *
   * @type {number}
   * @memberof ITransactionDetail
   */
  outflow?: number;
  /**
   * A friendly note for later.
   *
   * @type {string}
   * @memberof ITransactionDetail
   */
  memo?: string;
}
