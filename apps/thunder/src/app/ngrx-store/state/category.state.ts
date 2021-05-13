import { ICategory } from '@snurbco/contracts';

export interface ICategoryState {
  categories: ICategory[];
  selectedCategory: ICategory | null;
}

export const initialCategoryState: ICategoryState = {
  categories: [],
  selectedCategory: null,
};
