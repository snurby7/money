import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ICreateTransaction,
  IDeleteResponse,
  ITransaction,
  ITransactionDetail,
  ITransactionQuery,
} from '@snurbco/contracts';
import { forkJoin, Observable, throwError } from 'rxjs';
import {
  catchError,
  flatMap,
  map,
  materialize,
  switchMap,
  toArray,
} from 'rxjs/operators';
import { AccountService } from '../account';
import { CategoryService } from '../category';
import { SupportedLabel } from '../constants';
import { IAccountLinkBreak, IAccountLinkResponse } from '../extensions';
import {
  getRecordsByKey,
  getRecordsByKeyNotification,
  Neo4jService,
} from '../neo4j';
import { PayeeService } from '../payee';
import { RxResult } from '../temp';
import {
  Transaction_UsedAccount,
  Transaction_UsedCategory,
  Transaction_UsedPayee,
} from './constants';
import { TransactionQueries } from './queries';

@Injectable()
export class TransactionService {
  constructor(
    private neo4jService: Neo4jService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private payeeService: PayeeService
  ) {}

  /**
   * Creates a transaction and links it to a given category, payee, and account. Once the links are made, and their is a flattened result.
   * Checking for the flattenedResults makes sure that neo4j made the links. It will then go charge those accounts the amount.
   *
   * @param {ICreateTransaction} request
   * @returns {Observable<ITransactionDetail>}
   * @memberof TransactionService
   */
  public createTransaction(
    request: ICreateTransaction
  ): Observable<ITransactionDetail> {
    const resultKey = 'transactionResult';
    const { query, params } = TransactionQueries.createNewTransaction(
      resultKey,
      request
    );
    const createTransaction$: Observable<ITransactionDetail> = this.neo4jService.rxSession.writeTransaction(
      (txc) =>
        txc
          .run(query, params)
          .records()
          .pipe(getRecordsByKey<ITransactionDetail>(resultKey))
    );
    return createTransaction$.pipe(
      switchMap((result) => this.updateLinkedNodeBalanceByService$(result))
    );
  }

  /**
   * Wrapper server to make it easier to add another service that implements the same interface
   *
   * @private
   * @param {ITransaction} transaction
   * @returns {Observable<ITransaction>}
   * @memberof TransactionService
   */
  private updateLinkedNodeBalanceByService$(
    transaction: ITransactionDetail
  ): Observable<ITransactionDetail> {
    const amount = this.getTransactionAmount(transaction);
    const services = [
      this.accountService,
      this.payeeService,
      this.categoryService,
    ];
    return forkJoin(
      services.map((service) =>
        service.updateLinkedNodeBalance$({
          ...service.convertTransactionToAccountLink(transaction, amount),
        })
      )
    ).pipe(map(() => transaction));
  }

  /**
   * Function to get all the transactions that match the given query.
   *
   * @param {ITransactionQuery} request
   * @returns {Observable<ITransaction[]>}
   * @memberof TransactionService
   */
  public getTransactionsByQuery(
    request: Partial<ITransactionQuery>
  ): Observable<ITransaction[]> {
    const resultKey = 'nodes';
    const { query, params } = TransactionQueries.searchTransactions(
      resultKey,
      request
    );
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(
          materialize(),
          toArray(),
          getRecordsByKeyNotification<ITransaction>(resultKey)
        )
    );
  }

  /**
   * Function that will update a given transaction. If the ids no longer match they will remove the relationships and
   * tie a new relationship. Otherwise it will just update the balances by refunding and charging the new one.
   *
   * @param {ITransactionDetail} request
   * @returns {Observable<ITransactionDetail>}
   * @memberof TransactionService
   */
  public updateTransaction$(
    request: ITransactionDetail
  ): Observable<ITransactionDetail> {
    const findMatchingTransaction$ = this.getTransaction(
      request.id,
      request.budgetId
    ).pipe(
      map((transaction) => {
        return transaction
          ? transaction
          : throwError(
              new NotFoundException('No current transaction found to match!')
            );
      })
    );

    return findMatchingTransaction$.pipe(
      switchMap((transaction: ITransactionDetail) =>
        forkJoin([...this.updateLinkedNodeBalance$(transaction, request)])
      ),
      flatMap(() => this.updateTransactionProperties$(request))
    );
  }

  /**
   * Deletes a given transaction, when the transaction is matched it will refund all the previous links.
   *
   * @param {string} budgetId
   * @param {string} transactionId
   * @returns {Observable<IDeleteResponse>}
   * @memberof TransactionService
   */
  public deleteTransaction$(
    budgetId: string,
    transactionId: string
  ): Observable<IDeleteResponse> {
    return this.getTransactionsByQuery({
      budgetId: budgetId,
      id: transactionId,
    }).pipe(
      map((results) => results[0]),
      map((transaction) => {
        if (!transaction) {
          throw new NotFoundException('No current transaction found to match!');
        }
        return transaction;
      }),
      flatMap((transaction) => this.removeLinkWithRefund$(transaction)),
      flatMap((_) => this.deleteTransactionById$(transactionId, budgetId))
    );
  }

  /**
   * Get a transaction by a specific ID
   *
   * @param {string} transactionId Transaction ID to retrieve
   * @param {string} budgetId Budget ID to that the transaction is under
   * @returns {Observable<ITransaction>}
   * @memberof TransactionService
   */
  public getTransaction(
    transactionId: string,
    budgetId: string
  ): Observable<ITransactionDetail> {
    const resultKey = 'transaction';
    const { query, params } = TransactionQueries.getTransaction(
      resultKey,
      transactionId,
      budgetId
    );
    return this.neo4jService.rxSession.readTransaction((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(
          catchError((err) => throwError(err)),
          getRecordsByKey<ITransactionDetail>(resultKey)
        )
    );
  }

  /**
   * Function will take a request and will update the transaction properties on the request
   * it doesn't just bulk change them but individually picks off changeable ones.
   *
   * @private
   * @param {ITransaction} request The transaction object to use to update the saved transaction
   * @returns {Observable<ITransaction>}
   * @memberof TransactionService
   */
  private updateTransactionProperties$(
    request: ITransactionDetail
  ): Observable<ITransactionDetail> {
    const resultKey = 'transactionNode';
    const { query, params } = TransactionQueries.updateTransaction(
      resultKey,
      request
    );
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      trx
        .run(query, params)
        .records()
        .pipe(
          getRecordsByKey<ITransactionDetail>(resultKey),
          catchError((err) => throwError(err))
        )
    );
  }

  /**
   * Just gives you the number, either the inflow or the outflow. Since a transaction should have only one
   * it takes the inflow as the priority and the outflow as the secondary.
   *
   * @private
   * @param {ITransactionDetail} transaction
   * @returns {number}
   * @memberof TransactionService
   */
  private getTransactionAmount(transaction: ITransactionDetail): number {
    return transaction.inflow ? transaction.inflow : transaction.outflow || 0;
  }

  /**
   * Wrapper around a forkJoin to hand the transaction and request to the method so it can be used to update the balance on
   * an account, payee, and a transaction. Since it doesn't matter how they run, they all run in parallel
   *
   * @private
   * @param {ITransactionDetail} transaction
   * @param {ITransaction} request
   * @returns {Observable<any>}
   * @memberof TransactionService
   */
  private updateLinkedNodeBalance$(
    transaction: ITransactionDetail,
    request: ITransactionDetail
  ): Observable<IAccountLinkResponse>[] {
    interface ServiceRelationshipLink {
      service: PayeeService | AccountService | CategoryService;
      relationship: string;
    }
    const serviceLinks: ServiceRelationshipLink[] = [
      {
        service: this.accountService,
        relationship: Transaction_UsedAccount,
      },
      {
        service: this.categoryService,
        relationship: Transaction_UsedCategory,
      },
      {
        service: this.payeeService,
        relationship: Transaction_UsedPayee,
      },
    ];
    const currentTransactionAmount = this.getTransactionAmount(transaction);
    const updateTransactionRequestAmount = this.getTransactionAmount(request);

    return serviceLinks.map(({ service, relationship }) =>
      service.updateLink$(
        service.convertToAccountLinkResponse(
          transaction,
          request,
          relationship,
          currentTransactionAmount,
          updateTransactionRequestAmount
        )
      )
    );
  }
  /**
   * Function to remove the link between an account and a Payee/Category/Account and refund that node however much
   * money was used in the transaction. So if it's positive it takes it away and negative adds its back.
   *
   * @private
   * @param {ITransaction} currentTransaction
   * @returns {Observable<any>}
   * @memberof TransactionService
   */
  private removeLinkWithRefund$(
    currentTransaction: ITransaction
  ): Observable<any> {
    const refundAmount = currentTransaction.inflow
      ? -currentTransaction.inflow
      : currentTransaction.outflow
      ? -currentTransaction.outflow
      : 0;
    const commonRequest: Partial<IAccountLinkBreak> = {
      refundAmount,
      budgetId: currentTransaction.budgetId,
      transaction: {
        id: currentTransaction.id,
        label: SupportedLabel.Transaction,
        budgetId: currentTransaction.budgetId,
      },
    };

    return forkJoin([
      this.payeeService.removeLinkWithRefund({
        ...commonRequest,
        relationship: Transaction_UsedPayee,
        account: {
          id: currentTransaction.payeeId,
          label: SupportedLabel.Payee,
        },
      } as IAccountLinkBreak),
      this.accountService.removeLinkWithRefund({
        ...commonRequest,
        relationship: Transaction_UsedAccount,
        account: {
          id: currentTransaction.accountId,
          label: SupportedLabel.Account,
        },
      } as IAccountLinkBreak),
      this.categoryService.removeLinkWithRefund({
        ...commonRequest,
        relationship: Transaction_UsedCategory,
        account: {
          id: currentTransaction.categoryId,
          label: SupportedLabel.Category,
        },
      } as IAccountLinkBreak),
    ]);
  }

  /**
   * Function to delete a given query from the database by an id
   *
   * @private
   * @param {string} transactionId Transaction Id to be deleted
   * @param {string} transactionId Budget Id to be find the node under
   * @returns {Observable<IDeleteResponse>}
   * @memberof TransactionService
   */
  private deleteTransactionById$(
    transactionId: string,
    budgetId: string
  ): Observable<IDeleteResponse> {
    const { query, params } = TransactionQueries.deleteTransactionStatement(
      transactionId,
      budgetId
    );
    return this.neo4jService.rxSession.writeTransaction((trx) =>
      ((trx.run(query, params) as unknown) as RxResult).consume().pipe(
        map((result) => ({
          message: `Deleted ${
            result.counters.updates().nodesDeleted || 0
          } record(s)`,
          isDeleted: true,
          id: transactionId,
        }))
      )
    );
  }
}
