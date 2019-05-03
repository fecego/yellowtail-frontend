import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { CartService } from '../../services/cart.service';

import { ModalUserComponent } from './../modal-user/modal-user.component';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  cartObservable: Observable<Array<any>>;

  products: Array<any>;

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private cartService: CartService) {
    this.products = [];
    this.isLoggedIn = this.authService.isLoggedIn();
    this.cartObservable = this.cartService.getCartObservable();
  }

  ngOnInit() {
    this.isLoggedIn.subscribe(
      newValue => console.log('Observer got a next value: ' + newValue),
      error => console.error('Observer got an error: ' + error),
      () => console.log('Observer got a complete notification')
    );
 
    this.cartObservable.subscribe(
      products => { this.products = products }
    );
  }

  openFormModal(tab: string) {
    console.log('Open => ', tab);
    this.modalService.open(ModalUserComponent); 
    setTimeout( () => {
      $('.nav-tabs a[href="#' +  tab + '"]').tab('show'); 
    }, 100);
  }

  logout(){
    this.authService.logout();
  }

  getAmmount() {
    return this.products.reduce((accum, product) => {
      const total = product.price * product.quantity;
      return accum + total;
    }, 0);
  }

  getProductsInCartCount() {
    return this.products.length;
  }

}
