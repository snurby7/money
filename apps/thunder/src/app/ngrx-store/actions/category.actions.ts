import { createAction, props } from '@ngrx/store';
import { ICategory } from '@snurbco/contracts';

export const getCategoryList = createAction('[Category] Get Category List');
export const getCategoryList_Success = createAction(
  '[Category] Get Category List Success',
  props<{ categories: ICategory[] }>()
);
