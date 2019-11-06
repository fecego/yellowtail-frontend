import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thanks-shopping',
  templateUrl: './thanks-shopping.component.html',
  styleUrls: ['./thanks-shopping.component.css']
})
export class ThanksShoppingComponent implements OnInit {
  cardPayment: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
