import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { withLatestFrom } from 'rxjs/operators';
import { getCategoryList } from '../actions/category.actions';
import { selectSelectedBudget } from '../selectors/budget.selectors';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoryList),
      withLatestFrom(this._store.pipe(select(selectSelectedBudget))),
      mergeMap(([_, budget]) => this.category)
    )
  );

  constructor(
    private actions$: Actions,
    private _store: Store<IMammothState>,
    private categoryAgent: CategoryAgent
  ) {}
}
