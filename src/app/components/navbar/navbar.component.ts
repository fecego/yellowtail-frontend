import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { CartService } from '../../services/cart.service';
import { formatPrice } from '../../utils/formatUtils';

import { ModalUserComponent } from './../modal-user/modal-user.component';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedInObservable: Observable<boolean>;
  cartObservable: Observable<Array<any>>;

  username: string;
  products: Array<any>;

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private cartService: CartService) {

    this.products = [];
    this.username = '';
    this.isLoggedInObservable = this.authService.getLoggedInObservable();
    this.cartObservable = this.cartService.getCartObservable();
  }

  ngOnInit() {
    this.isLoggedInObservable.subscribe(
      isLoggedIn => this.changeLoggedIn(isLoggedIn),
      error => console.error('Observer got an error: ' + error)
    );
 
    this.cartObservable.subscribe(
      products => { this.products = products }
    );

    //Quitar el toast para poder dar click en el menu
    $('#toastContainer').hide();
  }

  changeLoggedIn(isLoggedIn: boolean) {
    if (isLoggedIn) {
      setTimeout( () => {
        const user = this.authService.getLocalUser();
        this.username = user.name;
      }, 100);
    }
  }

  openFormModal(tab: string) {
    console.log('Open => ', tab);
    const modal = this.modalService.open(ModalUserComponent, { centered: true });
    modal.componentInstance.showTab(tab);
  }

  logout(){
    this.authService.logout();
  }

  getAmmount() {
    const ammount = this.products.reduce((accum, product) => {
      const total = product.price * product.quantity;
      return accum + total;
    }, 0);
    return formatPrice(ammount);
  }

  getProductsInCartCount() {
    return this.products.length;
  }

}
