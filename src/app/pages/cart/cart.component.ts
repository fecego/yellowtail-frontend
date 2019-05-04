import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserComponent } from '../../components/modal-user/modal-user.component';

declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartObservable: Observable<Array<any>>;

  showPlaceholder: boolean;
  products: Array<any>;

  constructor(private cartService: CartService,
              private authService: AuthService,
              private modalService: NgbModal) {
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

  getTotal() {
    return this.products.reduce((accum, product) => {
      const total = product.price * product.quantity;
      return accum + total;
    }, 0);
  }

  continuePurchase() {
    const isLoggedIn = this.authService.getLoggedIn();
    if (isLoggedIn) {

    } else {
      this.modalService.open(ModalUserComponent); 
      setTimeout( () => {
        $('.nav-tabs a[href="#login"]').tab('show'); 
      }, 100);
    }
  }

}
