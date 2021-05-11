export enum CategoryApiRoute {
  CreateCategory = 'api/v1/category/:budgetId/create',
  GetAllCategories = 'api/v1/category/:budgetId/list',
  GetCategoryWithChildren = 'api/v1/category/:id/budget/:budgetId',
  UpdateCategory = 'api/v1/category/:id',
  DeleteCategoryAndChildren = 'api/v1/category/:budgetId/delete/:id',
}
