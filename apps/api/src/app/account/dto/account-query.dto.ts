import { IAccountQuery } from '@snurbco/contracts';
import { IsOptional, IsUUID } from 'class-validator';
export class AccountQuery implements IAccountQuery {
  @IsUUID()
  budgetId: string;

  @IsOptional()
  limit?: number;
}
