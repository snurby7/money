import { ApiProperty } from '@nestjs/swagger';
import { ICreateBudget } from '@snurbco/contracts';
import { IsNotEmpty, IsString } from 'class-validator';

export class Budget implements ICreateBudget {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name property given to your budget',
    example: 'Colorado Getaway',
    required: true,
  })
  name: string;
}
