import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { formatPrice } from '../../../utils/formatUtils';

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

  getPrice(price: number) {
    return formatPrice(price);
  }

  getTotalPrice() {
    const total = this.product.price * this.product.quantity;
    return formatPrice(total);
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

  getThumbnail(images: Array<string>) {
    return images[0];
  }

}
