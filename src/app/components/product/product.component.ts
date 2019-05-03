import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../services/notifications.service';
import { CartService } from '../../services/cart.service';

import { ModalProductComponent } from './../../components/modal-product/modal-product.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product: any;

  quantity: number;

  constructor(private modalService: NgbModal,
              private notificationsService: NotificationsService,
              private cartService: CartService) {
    this.quantity = 1;
  }

  ngOnInit() { }

  openProductModal() {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
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
