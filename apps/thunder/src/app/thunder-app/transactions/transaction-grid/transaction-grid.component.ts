import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'snurbco-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.scss'],
})
export class TransactionGridComponent implements OnInit {
  @Input() accountId = '';

  ngOnInit(): void {
    console.log(this.accountId);
  }
}
