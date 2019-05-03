import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  newProductsObservable = new BehaviorSubject<Array<any>>([]);
  featuredProductsObservable = new BehaviorSubject<Array<any>>([]);

  constructor() {

  }

  getNewProductsObservable() {
    return this.newProductsObservable;
  }

  getFeaturedProductsObservable() {
    return this.featuredProductsObservable;
  }

  getNewProducts() {
    let products : any = [{}, {}, {}, {}, {}, {}];
    products = products.map((product, index) => {
      product._id = `item_${index}`;
      product.price = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
      return product;
    });
    return this.newProductsObservable.next(products);
  }

  getFeaturedProducts() {
    const products = [{}, {}, {}, {}, {}, {}];
    return this.featuredProductsObservable.next(products);
  }

}
