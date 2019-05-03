import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartObservable: Observable<Array<any>>;

  showPlaceholder: boolean;
  products: Array<any>;

  constructor(private cartService: CartService) {
    this.showPlaceholder = true;
    this.cartObservable = this.cartService.getCartObservable();
  }

  ngOnInit() {
    this.cartObservable.subscribe(
      products => { 
        this.products = products;
        this.showPlaceholder = products.length == 0;
      }
    );
  }

}
