import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { NotificationsService } from '../../services/notifications.service';
import { ProductsService } from '../../services/products.service'
import { CartService } from '../../services/cart.service';
import { formatPrice } from '../../utils/formatUtils';
import uniqBy from 'lodash.uniqby';
import flatten from 'lodash.flatten';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productObservable: Observable<any>;
  product: any;
  quantity: number;
  variant: any;
  filters: any;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService,
              private cartService: CartService) {
    this.productObservable = this.productsService.getProductByUrlObservable();
    this.product = null;
    this.quantity = 1;
    this.variant = null;
    this.filters = {};
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

  getVariantPrice(price) {
    return formatPrice(price);
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

  getOptions() {
    let options = this.product.variants.map(variant => {
      return variant.options;
    });
    options = flatten(options);
    return uniqBy(options, 'key');
  }

  getOptionsValuesByKey(key: string) {
    let allOptions = this.product.variants.map(variant => {
      return variant.options;
    });
    allOptions = flatten(allOptions);
    const keyOptions = allOptions.filter(option => option.key == key);
    return uniqBy(keyOptions, 'value');
  }

  changeSelect(key, value) {
    console.log(`Cambio ${key} ${value}`);
    this.filters[key] = value;
  }

  getVariant() {
    const keyFilters = Object.keys(this.filters);
    if (keyFilters.length == 0) return;
    this.product.variants.filter(variant => {
      const { options } = variant;
      
    });
  }

}
