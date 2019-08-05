import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input()
  user: any

  showEditTax: boolean;
  taxInformation: any;

  constructor() {
    this.showEditTax = false;
    this.taxInformation = {};
  }

  ngOnInit() {
    if (this.user) {
      this.taxInformation = this.user.taxInformation;
    }
  }

  clickEditShowTax() {
    this.showEditTax = !this.showEditTax;
  }

}
