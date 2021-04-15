import { ApiProperty } from '@nestjs/swagger';
import { IPayeeQuery } from '@snurbco/contracts';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class PayeeQuery implements IPayeeQuery {
  @IsUUID()
  budgetId: string;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'A partial string to try and match a payee on',
    example: 'South',
  })
  name?: string;
}
