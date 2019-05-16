import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../services/notifications.service';
import { ProductsService } from '../../services/products.service'
import { CartService } from '../../services/cart.service';
import { formatPrice } from '../../utils/formatUtils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

  private selectedProductObservable: Observable<any>;

  product: any;
  quantity: number;

  constructor(public activeModal: NgbActiveModal,
              private productsService: ProductsService,
              private notificationsService: NotificationsService,
              private cartService: CartService,
              private router: Router) {
    this.selectedProductObservable = this.productsService.getSelectedProductObservable();
    this.quantity = 1;
  }

  ngOnInit() {
    this.selectedProductObservable.subscribe(
      product => this.product = product,
      error => console.log(error)
    );
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  getImages() {
    return this.product.images.map((image, index) => {
      return {
        image: image,
        activeClass: ( index == 0? 'active': '' )
      }
    });
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

  goToDetail() {
    this.router.navigate(['/producto', this.product.url]);
  }

}
