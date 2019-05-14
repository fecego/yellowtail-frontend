import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import allproducts from './products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private allProducts: Array<any>;

  private selectedProductObservable = new BehaviorSubject<any>(null);
  private newProductsObservable = new BehaviorSubject<Array<any>>([]);
  private featuredProductsObservable = new BehaviorSubject<Array<any>>([]);
  private productsByCategoryObservable = new BehaviorSubject<Array<any>>([]);
  private productByUrlObservable = new BehaviorSubject<any>(null);

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

  getSelectedProductObservable() {
    return this.selectedProductObservable;
  }

  getProductByUrlObservable() {
    return this.productByUrlObservable;
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

  changeSelectedProduct(product) {
    this.selectedProductObservable.next(product);
  }

  getProductByUrl(url: string) {
    const product : any = this.allProducts.find(product => product.url == url);
    return this.productByUrlObservable.next(product);
  }

}
