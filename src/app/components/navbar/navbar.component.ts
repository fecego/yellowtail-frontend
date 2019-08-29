import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { SearchbarService } from '../../services/searchbar.service';
import { CartService } from '../../services/cart.service';
import { formatPrice } from '../../utils/formatUtils';
import { Router } from '@angular/router';

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
  showSearchBarObservable: Observable<boolean>;

  username: string;
  products: Array<any>;
  showSearchBar: Boolean;

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private notificationsService: NotificationsService,
              private cartService: CartService,
              private searchbarService: SearchbarService,
              private router: Router) {

    this.products = [];
    this.username = '';
    this.showSearchBar = true;
    this.isLoggedInObservable = this.authService.getLoggedInObservable();
    this.cartObservable = this.cartService.getCartObservable();
    this.showSearchBarObservable = this.searchbarService.getSearchBarObservable();
  }

  ngOnInit() {
    this.isLoggedInObservable.subscribe(
      isLoggedIn => this.changeLoggedIn(isLoggedIn),
      error => console.error('Observer got an error: ' + error)
    );
 
    this.cartObservable.subscribe(
      products => { this.products = products }
    );

    this.showSearchBarObservable.subscribe(
      isVisible => this.showSearchBar = isVisible
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

  goToPage(fragment: string) {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/home')) {
      return document.querySelector(`#${fragment}`).scrollIntoView({ behavior: 'smooth' });
    }
    this.router.navigate(['/home'], {fragment: fragment}); 
  }

}
