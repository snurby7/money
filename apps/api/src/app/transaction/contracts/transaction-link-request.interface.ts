import { ITransaction } from '@snurbco/contracts';

export interface ITransactionLinkRequest {
  currentTransaction: ITransaction;
  updatedTransactionRequest: ITransaction;
  linkingRelationship: string;
  nodeLabel: string;
  linkingLabel: string;
  budgetId: string;
  propKey: keyof ITransaction;
}
