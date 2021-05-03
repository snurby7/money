import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'snurbco-existing-user',
  templateUrl: './existing-user.component.html',
  styleUrls: ['./existing-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExistingUserComponent {
  constructor(private authService: AuthService) {}

  public loginWithRedirect() {
    this.authService.loginWithRedirect({ appState: { target: '/app' } });
  }
}
