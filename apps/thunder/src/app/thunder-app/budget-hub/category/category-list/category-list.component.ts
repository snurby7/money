import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICategory } from '@snurbco/contracts';
import { Observable } from 'rxjs';
import { getCategoryList } from '../../../../ngrx-store/actions/category.actions';
import { selectCategoryList } from '../../../../ngrx-store/selectors/category.selectors';
import { IMammothState } from '../../../../ngrx-store/state/mammoth.state';

@Component({
  selector: 'snurbco-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
  public categories$: Observable<ICategory[]>;

  constructor(private _store: Store<IMammothState>) {
    this.categories$ = this._store.pipe(select(selectCategoryList));
  }

  ngOnInit(): void {
    this._store.dispatch(getCategoryList());
  }
}
