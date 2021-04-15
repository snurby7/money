import { ICreatePayee } from '@snurbco/contracts';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePayee implements ICreatePayee {
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
