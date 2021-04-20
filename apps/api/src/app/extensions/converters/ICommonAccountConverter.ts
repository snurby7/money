import { ITransaction, ITransactionDetail } from '@snurbco/contracts';
import { IAccountLinkedNodeMeta, IAccountLinkRequest } from '../account';

export interface ICommonAccountConverter {
  convertTransactionToAccountLink: (
    transaction: ITransactionDetail,
    transactionAmount: number
  ) => IAccountLinkedNodeMeta;
  convertToAccountLinkResponse: (
    currentTransaction: ITransactionDetail,
    transactionUpdateRequest: ITransactionDetail,
    linkingRelationship: string,
    currentTransactionAmount: number,
    updatedTransactionRequestAmount: number
  ) => IAccountLinkRequest;
}
