import { ICategoryQuery } from '@snurbco/contracts';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CategoryQuery implements ICategoryQuery {
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @IsOptional()
  limit?: number;
}
