import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  @Input()
  product: any;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  getTotalPrice() {
    return this.product.price * this.product.quantity;
  }

  addQuantity() {
    this.product.quantity++;
  }

  subtractQuantity() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
    }
  }

  removeProduct() {
    const productId = this.product._id;
    this.cartService.removeProductFromCart(productId);
  }

}
