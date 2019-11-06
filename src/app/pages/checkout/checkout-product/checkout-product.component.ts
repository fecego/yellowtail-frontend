import { Component, OnInit, Input } from '@angular/core';
import { formatPrice } from '../../../utils/formatUtils';

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

  getPrice() {
    const total = this.product.price * this.product.quantity;
    return formatPrice(total);
  }

}
