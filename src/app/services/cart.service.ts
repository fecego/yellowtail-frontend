import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsInCart: Array<any>;
  private cartObservable = new BehaviorSubject<Array<any>>([]);

  constructor(private localStorageService: LocalStorageService) {
    this.itemsInCart = localStorageService.getValue(LocalStorageService.KEY_CART, []);
    this.cartObservable.next(this.itemsInCart);
  }

  getCartObservable() {
    return this.cartObservable;
  }

  addProductToCart(product: any) {
    this.itemsInCart.push(product);
    this.cartObservable.next(this.itemsInCart);
    this.localStorageService.saveValue(LocalStorageService.KEY_CART, this.itemsInCart);
  }

  removeProductFromCart(productId: any) {
    this.itemsInCart = this.itemsInCart.filter(item => item._id != productId);
    this.cartObservable.next(this.itemsInCart);
    this.localStorageService.saveValue(LocalStorageService.KEY_CART, this.itemsInCart);
  }

}
