import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  showEditTax: boolean;
  taxInformation: any;

  constructor() {
    this.showEditTax = false;
    this.taxInformation = {};
  }

  ngOnInit() {

  }

  clickEditShowTax() {
    this.showEditTax = !this.showEditTax;
  }

}
