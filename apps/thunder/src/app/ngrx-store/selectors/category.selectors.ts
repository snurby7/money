import { createSelector } from '@ngrx/store';
import { ICategoryState } from '../state/category.state';
import { IMammothState } from '../state/mammoth.state';

const selectCategoryState = (state: IMammothState) => state.category;

export const selectCategoryList = createSelector(
  selectCategoryState,
  (state: ICategoryState) => state.categories
);
