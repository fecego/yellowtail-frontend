import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { NotificationsService } from '../../services/notifications.service';
import { ProductsService } from '../../services/products.service'
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productObservable: Observable<any>;
  product: any;
  quantity: number;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService,
              private cartService: CartService) {
    this.productObservable = this.productsService.getProductByUrlObservable();
    this.product = null;
    this.quantity = 1;
  }

  ngOnInit() {
    const productUrl = this.route.snapshot.paramMap.get("productUrl");
    console.log(productUrl);

    this.productObservable.subscribe(
      product => this.product = product,
      error => console.log(error)
    );

    this.productsService.getProductByUrl(productUrl);
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
