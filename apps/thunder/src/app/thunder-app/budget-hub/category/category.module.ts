import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryItemComponent } from './category-item/category-item.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryItemComponent],
  imports: [CommonModule],
  exports: [CategoryListComponent],
})
export class CategoryModule {}
