import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPayee } from '@snurbco/contracts';
import { Observable } from 'rxjs';
import { CreatePayee } from './dto';
import { PayeeService } from './payee.service';

@Controller('payee')
@ApiTags('payee')
export class PayeeController {
  constructor(private payeeService: PayeeService) {}

  @Post(':budgetId')
  @ApiOperation({ summary: 'Create a payee' })
  @ApiResponse({
    status: 201,
    description: 'Returns the newly created payee',
  })
  //  @UseGuards(AuthGuard('jwt'))
  // TODO: Turn back on Auth0, something is slightly off.
  public createPayee(
    @Param('budgetId') budgetId: string,
    @Body() createRequest: CreatePayee
  ): Observable<IPayee> {
    if (!createRequest.budgetId || createRequest.budgetId !== budgetId) {
      throw new HttpException(
        'No budgetId found on request',
        HttpStatus.CONFLICT
      );
    }
    return this.payeeService.createPayee(createRequest);
  }

  @Get(':budgetId')
  @ApiOperation({ summary: 'Get all Payees by a given request' })
  @ApiResponse({
    status: 201,
    description: 'All payees that match the given request',
  })
  //  @UseGuards(AuthGuard('jwt'))
  // TODO: Turn back on Auth0, something is slightly off.
  public getAllPayees(
    @Param('budgetId') budgetId: string
  ): Observable<IPayee[]> {
    return this.payeeService.getAllPayees(budgetId);
  }
}
