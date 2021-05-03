import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'snurbco-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  public isNewUser = false;

  constructor() {}

  ngOnInit(): void {}

  public newUserClicked() {
    this.isNewUser = true;
  }

  public existingUserClicked() {
    this.isNewUser = false;
  }
}
