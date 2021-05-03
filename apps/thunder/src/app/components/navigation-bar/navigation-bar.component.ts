import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'snurbco-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
