import { Injectable } from '@angular/core';
import { ICategory } from '@snurbco/contracts';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../core';
import { CategoryApiRoute } from './category-api.routes';

@Injectable()
export class CategoryAgent {
  constructor(private httpService: HttpService) {}

  public getCategories(budgetId?: string): Observable<ICategory[]> {
    if (!budgetId) {
      return of([]);
    }
    return this.httpService.get(CategoryApiRoute.GetAllCategories, {
      budgetId,
    });
  }
}
