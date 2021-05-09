import type { IAccount } from './account.interface';

/**
 * Type to be implemented when creating an account
 *
 * @export
 * @interface IAccountCreate
 * @extends {Omit<IAccount, 'id'>}
 */
export type ICreateAccount = Omit<IAccount, 'id'>;
