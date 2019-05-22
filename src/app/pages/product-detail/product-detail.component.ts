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
      product => this.initProduct(product),
      error => console.log(error)
    );

    this.productsService.getProductByUrl(productUrl);
  }

  initProduct(product) {
    if (!product) return;
    this.product = product;
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
    if (tempProduct.withVariants && !this.variant) {
      return alert('Selecciona las opciones');
    }

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
    const filters = this.filters;
    const keyFilters = Object.keys(filters);
    const options = this.getOptions();
    const keys = options.map(option => option.key);
    //Si ya selecciono todos los parametros
    if ( keys.every( key => keyFilters.includes(key) ) ) {
      this.variant = this.getVariantByFilters(this.product.variants, filters);
    } else {
      this.variant = null;
    }
    return this.variant;
  }

  getVariantByFilters(variants, filters) {
    return variants.find(variant => {
      const { options } = variant;
      return options.every(option => {
        const {key, value} = option;
        return (filters[key] == value);
      });
    });
  }

}
