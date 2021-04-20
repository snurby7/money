import { IBudget } from '@snurbco/contracts';
import { replaceKeyPlaceholders } from '../../utils';
import { axiosInstance } from './axios-instance';
enum ApiRoute {
  CreateBudget = 'api/v1/budget',
  DeleteBudget = 'api/v1/budget/:budgetId',
  LoadBudgets = 'api/v1/budget',
}

class BudgetService {
  public budgetCache: Record<string, IBudget> = JSON.parse(
    sessionStorage.getItem('SNURBCO_Budgets') ?? '{}'
  );

  public async createBudget(name: string): Promise<IBudget> {
    const response = await axiosInstance.post<IBudget>(ApiRoute.CreateBudget, {
      name,
    });
    return response.data;
  }

  public async loadBudgets(): Promise<IBudget[]> {
    const response = await axiosInstance.get<IBudget[]>(ApiRoute.LoadBudgets);
    response.data.forEach((budget) => (this.budgetCache[budget.id] = budget));
    sessionStorage.setItem('SNURBCO_Budgets', JSON.stringify(this.budgetCache));
    return response.data;
  }

  public async deleteBudget(budgetId: string): Promise<IBudget[]> {
    const response = await axiosInstance.delete(
      replaceKeyPlaceholders(ApiRoute.DeleteBudget, { budgetId })
    );
    return response.data;
  }
}

export const budgetService = new BudgetService();
