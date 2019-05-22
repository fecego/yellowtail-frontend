import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
import { ProductsService } from '../../services/products.service'
import { FavoritesService } from '../../services/favorites.service'
import { CartService } from '../../services/cart.service';
import { AuthService } from './../../services/auth.service';
import { formatPrice } from '../../utils/formatUtils';

import { ModalProductComponent } from './../../components/modal-product/modal-product.component';
import { ModalUserComponent } from '../../components/modal-user/modal-user.component';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product: any;

  quantity: number;
  private favoritesObservable: Observable<Array<string>>;

  constructor(private modalService: NgbModal,
              private notificationsService: NotificationsService,
              private cartService: CartService,
              private productsService: ProductsService,
              private favoritesService: FavoritesService,
              private authService: AuthService,
              private router: Router) {
    this.quantity = 1;
    this.favoritesObservable = this.favoritesService.getFavoritesObservable();
  }

  ngOnInit() {
    this.favoritesObservable.subscribe(
      favorites => this.updateFavorites(favorites),
      error => console.log(error)
    );
  }

  openProductModal() {
    this.productsService.changeSelectedProduct(this.product);
    this.modalService.open(ModalProductComponent);
  }

  getPrice(price: number) {
    if (this.product.withVariants) {
      const prices = this.product.variants.map(variant => variant.price);
      const maxAndMin = {
        max: Math.max(...prices),
        min: Math.min(...prices),
      };
      return `${formatPrice(maxAndMin.max)} - ${formatPrice(maxAndMin.min)}`;
    }

    return formatPrice(price);
  }

  addQuantity() {
    this.quantity++;
  }

  subtractQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addProductToCart() {
    if (this.product.withVariants) {
      return this.goToDetail();
    }

    const tempProduct = Object.assign({}, this.product);
    tempProduct.quantity = this.quantity;
    this.notificationsService.addProductToCart(tempProduct);
    this.cartService.addProductToCart(tempProduct);
  }

  getImage() {
    return this.product.images[0];
  }

  toggleFavorite() {
    if (!this.authService.getLoggedIn()) {
      const modal = this.modalService.open(ModalUserComponent);
      modal.componentInstance.showTab('login');
    }

    const productId = this.product._id;
    if (this.product.isFavorite) {
      this.favoritesService.unmarkFavorite(productId);
    } else {
      this.favoritesService.markAsFavorite(productId);
    }
  }

  updateFavorites(favorites) {
    this.product.isFavorite = favorites.includes(this.product._id);
  }

  goToDetail() {
    this.router.navigate(['/producto', this.product.url]);
  }

}
