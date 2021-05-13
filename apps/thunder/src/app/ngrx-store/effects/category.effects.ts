import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { CategoryAgent } from '../../agents';
import {
  CategoryAction,
  getCategoryList_Success,
} from '../actions/category.actions';
import { selectSelectedBudget } from '../selectors/budget.selectors';
import { IMammothState } from '../state/mammoth.state';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      tap(() => console.log('here it is')),
      ofType(CategoryAction.GetCategoryList),
      withLatestFrom(this._store.pipe(select(selectSelectedBudget))),
      mergeMap(([_, budget]) =>
        this.categoryAgent
          .getCategories(budget?.id)
          .pipe(map((categories) => getCategoryList_Success({ categories })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _store: Store<IMammothState>,
    private categoryAgent: CategoryAgent
  ) {}
}
