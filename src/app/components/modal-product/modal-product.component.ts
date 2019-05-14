import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../services/notifications.service';
import { ProductsService } from '../../services/products.service'
import { CartService } from '../../services/cart.service';

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
              private cartService: CartService) {
    this.selectedProductObservable = this.productsService.getSelectedProductObservable();
    this.quantity = 1;
  }

  ngOnInit() {
    this.selectedProductObservable.subscribe(
      product => this.product = product,
      error => console.log(error)
    );
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
    const tempProduct = Object.assign({}, this.product);
    tempProduct.quantity = this.quantity;
    this.notificationsService.addProductToCart(tempProduct);
    this.cartService.addProductToCart(tempProduct);
  }

}
