import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsInCart: Array<any>;
  private cartObservable = new BehaviorSubject<Array<any>>([]);

  constructor() {
    this.itemsInCart = [];
    this.cartObservable.next(this.itemsInCart);
  }

  getCartObservable() {
    return this.cartObservable;
  }

  addProductToCart(product: any) {
    this.itemsInCart.push(product);
    this.cartObservable.next(this.itemsInCart);
  }

  removeProductFromCart(productId: any) {

  }

}
