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
  relatedProductObservable: Observable<any>;

  product: any;
  quantity: number;
  related: Array<any>;
  variant: any;
  filters: any;
  showShare: boolean;

  currentImage: any;
  imageIndex: number;
  unavailable: boolean = false;
  limitedProducts: boolean = false;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService,
              private cartService: CartService) {
    this.productObservable = this.productsService.getProductByUrlObservable();
    this.relatedProductObservable = this.productsService.getRelatedProductsObservable();
    this.product = null;
    this.quantity = 1;
    this.variant = null;
    this.filters = {};
    this.related = [];
    this.showShare = false;

    this.imageIndex = 0;
    this.currentImage = {
      normal: "",
      zoom: ""
    };
  }

  ngOnInit() {
    const productUrl = this.route.snapshot.paramMap.get("productUrl");

    this.productObservable.subscribe(
      product => this.initProduct(product),
      error => console.log(error)
    );

    this.relatedProductObservable.subscribe(
      products => this.related = products,
      error => console.log(error)
    );

    this.productsService.getProductByUrl(productUrl);
  }

  initProduct(product) {
    if (!product) return;
    console.log('Product => ', product);
    this.product = product;
    const firstImage = product.images[this.imageIndex];
    this.currentImage = {
      normal: firstImage,
      zoom: "/assets/img/zoom/kayakgrande.jpeg"
    };
    this.productsService.getRealtedProducts(this.product.related);
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

  getShareUrl() {
    return `http://165.227.48.162/producto/${this.product.url}`;
  }

  toggleShare() {
    this.showShare = !this.showShare;
  }

  toggleFavorite() {
    
  }

  selectImageByIndex(index) {
    this.imageIndex = index;
    const image = this.product.images[index];
    this.currentImage = {
      normal: image,
      zoom: "/assets/img/zoom/kayakgrande.jpeg"
    };
  }

  changeImageByRol(rol) {
    let newIndex = 0;
    const imagesLength = this.product.images.length;

    if (rol === 'prev') {
      // Si apreto anterior y esta ya en la 0, poner la ultima
      if (this.imageIndex === 0) {
        newIndex = imagesLength - 1;
      } else {
        newIndex = this.imageIndex - 1;
      }
    } else if (rol === 'next') {
      // Si apreto siguiente y esta ya en la ultima, poner la 0
      if (this.imageIndex === (imagesLength - 1) ) {
        newIndex = 0;
      } else {
        newIndex = this.imageIndex + 1;
      }
    }
    this.imageIndex = newIndex;
    this.selectImageByIndex(newIndex);
  }

}
