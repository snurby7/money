import type { ICoreNode } from '../../core-node.interface';

/**
 * A created payee interface
 *
 * @export
 * @interface IPayee
 */
export interface IPayee extends ICoreNode {
  /**
   * The name of the payee
   *
   * @example Southwest Airlines
   * @type {string}
   * @memberof IPayee
   */
  name: string;
}
