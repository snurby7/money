import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'snurbco-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent {
  public newUserForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public onSubmit(): void {
    console.log(this.newUserForm.value);
  }
}
