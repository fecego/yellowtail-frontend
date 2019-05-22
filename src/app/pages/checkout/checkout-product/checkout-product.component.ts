import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.css']
})
export class CheckoutProductComponent implements OnInit {

  @Input()
  product: any;

  constructor() { }

  ngOnInit() {
  }

  getImage(allImages) {
    return allImages[0];
  }

}
