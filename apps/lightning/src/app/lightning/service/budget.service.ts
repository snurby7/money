import { IBudget } from '@snurbco/contracts';
import { BehaviorSubject, Observable } from 'rxjs';
import { replaceKeyPlaceholders } from '../../utils';
import { axiosInstance } from './axios-instance';
enum ApiRoute {
  CreateBudget = 'api/v1/budget',
  DeleteBudget = 'api/v1/budget/:budgetId',
  LoadBudgets = 'api/v1/budget',
}

class BudgetService {
  private budgetCache: Record<string, IBudget> = JSON.parse(
    sessionStorage.getItem('SNURBCO_Budgets') ?? '{}'
  );

  private _budgets = new BehaviorSubject<IBudget[]>(
    Object.values(this.budgetCache) ?? []
  );

  public get budgets(): Observable<IBudget[]> {
    return this._budgets.asObservable();
  }

  public async createBudget(name: string): Promise<IBudget> {
    const response = await axiosInstance.post<IBudget>(ApiRoute.CreateBudget, {
      name,
    });
    return response.data;
  }

  public async loadBudgets(): Promise<IBudget[]> {
    const response = await axiosInstance.get<IBudget[]>(ApiRoute.LoadBudgets);
    if (response.data.length > 0) {
      this._budgets.next(response.data);
      sessionStorage.setItem(
        'SNURBCO_Budgets',
        JSON.stringify(this.budgetCache)
      );
      response.data.forEach((budget) => (this.budgetCache[budget.id] = budget));
    }
    return response.data;
  }

  public async deleteBudget(budgetId: string): Promise<IBudget[]> {
    const response = await axiosInstance.delete(
      replaceKeyPlaceholders(ApiRoute.DeleteBudget, { budgetId })
    );
    this._budgets.next(
      this._budgets.value.filter((budget) => budget.id !== budgetId)
    );
    return response.data;
  }
}

export const budgetService = new BudgetService();
