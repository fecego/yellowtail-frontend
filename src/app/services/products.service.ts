import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import allproducts from './products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  allProducts: Array<any>;
  newProductsObservable = new BehaviorSubject<Array<any>>([]);
  featuredProductsObservable = new BehaviorSubject<Array<any>>([]);

  constructor() {
    this.allProducts= allproducts.allProducts;
  }

  getNewProductsObservable() {
    return this.newProductsObservable;
  }

  getFeaturedProductsObservable() {
    return this.featuredProductsObservable;
  }

  getNewProducts() {
    const products : any = this.allProducts.filter(product => product.newProduct);
    return this.newProductsObservable.next(products);
  }

  getFeaturedProducts() {
    const products : any = this.allProducts.filter(product => product.featured);
    return this.featuredProductsObservable.next(products);
  }

}
