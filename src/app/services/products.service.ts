import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import allproducts from './products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private allProducts: Array<any>;
  private newProductsObservable = new BehaviorSubject<Array<any>>([]);
  private featuredProductsObservable = new BehaviorSubject<Array<any>>([]);
  private productsByCategoryObservable = new BehaviorSubject<Array<any>>([]);

  constructor() {
    this.allProducts= allproducts.allProducts;
  }

  getNewProductsObservable() {
    return this.newProductsObservable;
  }

  getFeaturedProductsObservable() {
    return this.featuredProductsObservable;
  }

  getProductsByCategoryObservable() {
    return this.productsByCategoryObservable;
  }

  getNewProducts() {
    const products : any = this.allProducts.filter(product => product.newProduct);
    return this.newProductsObservable.next(products);
  }

  getFeaturedProducts() {
    const products : any = this.allProducts.filter(product => product.featured);
    return this.featuredProductsObservable.next(products);
  }


  getProductsByCategory(category) {
    const products : any = this.allProducts.filter(product => product.category == category);
    return this.productsByCategoryObservable.next(products);
  }

}
