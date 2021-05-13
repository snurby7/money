import { Action, createReducer, on } from '@ngrx/store';
import { getCategoryList_Success } from '../actions/category.actions';
import { ICategoryState, initialCategoryState } from '../state/category.state';

export const reducers = createReducer(
  initialCategoryState,
  on(getCategoryList_Success, (state, { categories }) => ({
    ...state,
    categories,
  }))
);

export function categoryReducers(
  state: ICategoryState | undefined,
  action: Action
) {
  return reducers(state, action);
}
