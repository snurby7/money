import { createAction, props } from '@ngrx/store';
import { ICategory } from '@snurbco/contracts';

export enum CategoryAction {
  GetCategoryList = '[Category] Get Category List',
  GetCategoryList_Success = '[Category] Get Category List Success',
}

export const getCategoryList = createAction(CategoryAction.GetCategoryList);
export const getCategoryList_Success = createAction(
  CategoryAction.GetCategoryList_Success,
  props<{ categories: ICategory[] }>()
);
