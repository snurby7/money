import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'snurbco-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
