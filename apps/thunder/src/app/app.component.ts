import { Component } from '@angular/core';

@Component({
  selector: 'snurbco-root',
  template: `
    <snurbco-nav-bar></snurbco-nav-bar><router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
