import { ApiProperty } from '@nestjs/swagger';
import {
  IDateModel,
  IFormattedNode,
  ITransactionDetail,
} from '@snurbco/contracts';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class TransactionDto implements ITransactionDetail {
  date: IDateModel;
  accountId: string;
  categoryId: string;
  payeeId: string;

  @ApiProperty({
    description: 'Budget Id that has all the Id properties above',
    example: '6f76c705-aee2-404e-b2a8-a02cce1a0590',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  budgetId: string;

  @ApiProperty({
    description: 'Total inflow from the transaction',
    example: 16.39,
  })
  @ValidateIf((prop) => !prop.outflow && prop.outflow < 0)
  @IsNumber()
  @Min(0)
  inflow?: number;

  @ApiProperty({
    description: 'Total outflow from the transaction',
    example: -16.39,
  })
  @ValidateIf((prop) => !prop.inflow && prop.inflow > 0)
  @IsNumber()
  @Max(0)
  outflow?: number;

  @ApiProperty({
    description: 'Just a little description on the transaction',
    example: 'Food sucked, never coming back',
    required: false,
  })
  @IsOptional()
  @IsString()
  memo?: string;
  createdDate: IDateModel;
  account: IFormattedNode;
  category: IFormattedNode;
  payee: IFormattedNode;
  @ApiProperty({
    description:
      'Must have an id on this in order to find the correct transaction to update',
    example: '2ba85dda-7a9f-4046-9841-89bc15b9295f',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
