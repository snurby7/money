import { Component } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'snurbco-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [],
})
export class NavBarComponent {
  constructor(public authService: AuthService) {}
}
