import { Injectable, Logger } from '@nestjs/common';
import {
  IAccount,
  IAccountQuery,
  ICreateAccount,
  IDeleteResponse,
  ITransaction,
  ITransactionDetail,
} from '@snurbco/contracts';
import { Observable } from 'rxjs';
import { map, materialize, toArray } from 'rxjs/operators';
import { SupportedLabel } from '../constants';
import {
  CommonAccountService,
  IAccountBalanceRequest,
  IAccountLinkedNodeMeta,
  IAccountLinkRequest,
  ICommonAccountConverter,
} from '../extensions';
import {
  getRecordsByKey,
  getRecordsByKeyNotification,
  Neo4jService,
} from '../neo4j';
import { RxResult } from '../temp';
import { accountQueries } from './queries';

@Injectable()
export class AccountService
  extends CommonAccountService
  implements ICommonAccountConverter {
  protected readonly logger = new Logger(AccountService.name);

  constructor(protected neo4jService: Neo4jService) {
    super(neo4jService);
  }

  /**
   * Create a new account, something like a credit card or checking account.
   *
   * @param {ICreateAccount} request
   * @returns {Observable<IAccount>}
   * @memberof AccountService
   */
  public createAccount(request: ICreateAccount): Observable<IAccount> {
    const resultKey = 'account';
    const { query, params } = accountQueries.createAccount(resultKey, request);
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(getRecordsByKey<IAccount>(resultKey))
    );
  }

  /**
   * Find all the given categories that below to a certain budget
   *
   * @param {IAccountQueryDto} request
   * @returns {Observable<IAccount[]>}
   * @memberof AccountService
   */
  public findAccounts(request: IAccountQuery): Observable<IAccount[]> {
    const resultKey = 'accounts';
    const { query, params } = accountQueries.findAccounts(resultKey, request);
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx.run(query, params).records().pipe(
        materialize(), // gather all the notifications from the stream
        toArray(), // turn them all into an array
        getRecordsByKeyNotification(resultKey) // * Grab results
      )
    );
  }

  /**
   * Find a single account, no need for a budgetId, but it might help with less iteration, maybe a future
   * update can fix that one.
   *
   * @param {string} id
   * @returns {Observable<IAccount>}
   * @memberof AccountService
   */
  public findAccount(
    budgetId: string,
    accountId: string
  ): Observable<IAccount> {
    const resultKey = 'account';
    const { query, params } = accountQueries.getAccountById(
      resultKey,
      budgetId,
      accountId
    );
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx.run(query, params).records().pipe(
        getRecordsByKey<IAccount>(resultKey) // this knowingly only grabs the first record, only one should be emitted here
      )
    );
  }

  /**
   * Updates an accounts name and balance, more properties will need to be added later.
   *
   * @param {IAccount} request
   * @returns {Observable<IAccount>}
   * @memberof AccountService
   */
  public updateAccountDetails(request: IAccount): Observable<IAccount> {
    const resultKey = 'account';
    const { query, params } = accountQueries.updateExistingAccount(
      resultKey,
      request
    );
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(getRecordsByKey<IAccount>(resultKey))
    );
  }

  /**
   * Delete an account
   *
   * @param {string} id
   * @returns {Promise<{ message: string }>}
   * @memberof AccountService
   */
  public deleteAccount(
    budgetId: string,
    accountId: string
  ): Observable<IDeleteResponse> {
    const resultKey = 'deletedAccount';
    const { query, params } = accountQueries.deleteAccountById(
      resultKey,
      budgetId,
      accountId
    );
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      ((trx.run(query, params) as unknown) as RxResult).consume().pipe(
        map((result) => ({
          message: `Deleted ${
            result.counters.updates().nodesDeleted || 0
          } record(s)`,
          id: accountId,
          isDeleted: true,
        }))
      )
    );
  }

  /**
   * Converts the transaction into something that can be used to reference an Account
   *
   * @param {ITransactionDetail} transaction Transaction to scrape data out of
   * @param {number} transactionAmount The transaction amount (+, -, 0)
   * @returns {IAccountLinkedNodeMeta}
   * @memberof AccountService
   */
  public convertTransactionToAccountLink(
    transaction: ITransactionDetail,
    transactionAmount: number
  ): IAccountLinkedNodeMeta {
    return {
      id: transaction.accountId,
      label: SupportedLabel.Account,
      budgetId: transaction.budgetId,
      amount: transactionAmount,
    };
  }

  /**
   * Convert a stored transaction and it's updated request to a LinkResponse
   *
   * @param {ITransactionDetail} currentTransaction
   * @param {ITransactionDetail} transactionUpdateRequest
   * @param {string} linkingRelationship
   * @param {number} currentTransactionAmount
   * @param {number} updatedTransactionRequestAmount
   * @returns {IAccountLinkResponse}
   * @memberof CategoryService
   */
  public convertToAccountLinkResponse(
    currentTransaction: ITransactionDetail,
    transactionUpdateRequest: ITransactionDetail,
    linkingRelationship: string,
    currentTransactionAmount: number,
    updatedTransactionRequestAmount: number
  ): IAccountLinkRequest {
    const currentNodeRelationship: IAccountBalanceRequest = {
      id: currentTransaction.accountId,
      label: SupportedLabel.Account,
      isBalanceDifferent:
        currentTransaction.inflow !== transactionUpdateRequest.inflow ||
        currentTransaction.outflow !== transactionUpdateRequest.outflow,
      chargeAmount: updatedTransactionRequestAmount,
      refundAmount: -currentTransactionAmount,
      budgetId: currentTransaction.budgetId,
    };

    return {
      storedTransactionDetails: {
        id: currentTransaction.id,
        label: SupportedLabel.Transaction,
        budgetId: currentTransaction.budgetId,
        relationship: linkingRelationship,
        balanceRequest: currentNodeRelationship,
      },
      currentTransactionLinkDetails: {
        id: currentTransaction.accountId,
        amount: -currentTransactionAmount, // invert the current amount to refund it
        label: SupportedLabel.Account,
        budgetId: currentTransaction.budgetId,
      },
      newLinkDetails: {
        id: transactionUpdateRequest.accountId,
        amount: updatedTransactionRequestAmount,
        label: SupportedLabel.Account,
        budgetId: transactionUpdateRequest.budgetId,
      },
    };
  }
}
