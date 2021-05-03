import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'snurbco-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: [],
})
export class AccountDetailComponent {
  public accountId: string;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.accountId =
      this._activatedRoute.snapshot.paramMap.get('accountId') ?? '';
  }
}
