import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoritesService } from './favorites.service';

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
  private productsByQueryObservable = new BehaviorSubject<Array<any>>([]);
  private relatedProductsObservable = new BehaviorSubject<Array<any>>([]);
  private productsByIdsObservable = new BehaviorSubject<Array<any>>([]);
  private favoritesObservable = new BehaviorSubject<Array<any>>([]);

  constructor(private favoritesService: FavoritesService) {
    this.allProducts= allproducts.allProducts;
  }

  marksFavoritesProducts(products) {
    const favorites = this.favoritesService.getFavoritesIds();
    return products.map(product => {
      product.isFavorite = favorites.includes(product._id);
      return product;
    });
  }

  markFavoriteProduct(product) {
    if (!product) return product;
    const favorites = this.favoritesService.getFavoritesIds();
    product.isFavorite = favorites.includes(product._id);
    return product;
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

  getProductByQueryObservable() {
    return this.productsByQueryObservable;
  }

  getRelatedProductsObservable() {
    return this.relatedProductsObservable;
  }

  getProducsByIdsObservable() {
    return this.productsByIdsObservable;
  }

  getFavoritesObservable() {
    return this.favoritesObservable;
  }

  getNewProducts() {
    let products : any = this.allProducts.filter(product => product.newProduct);
    products = this.marksFavoritesProducts(products);
    return this.newProductsObservable.next(products);
  }

  getFeaturedProducts() {
    let products : any = this.allProducts.filter(product => product.featured);
    products = this.marksFavoritesProducts(products);
    return this.featuredProductsObservable.next(products);
  }

  getProductsByCategory(category) {
    let products : any = this.allProducts.filter(product => product.category == category);
    products = this.marksFavoritesProducts(products);
    return this.productsByCategoryObservable.next(products);
  }

  changeSelectedProduct(product) {
    product = this.markFavoriteProduct(product);
    this.selectedProductObservable.next(product);
  }

  getProductByUrl(url: string) {
    let product : any = this.allProducts.find(product => product.url == url);
    product = this.markFavoriteProduct(product);
    return this.productByUrlObservable.next(product);
  }

  getProductsByQuery(query: string) {
    setTimeout( () => {
      let products  : any = this.allProducts.filter(product => product.name.includes(query));
      products = this.marksFavoritesProducts(products);
      return this.productsByQueryObservable.next(products);
    }, 2000); 
  }

  getRealtedProducts(productIds: Array<string>) {
    let products : any = this.allProducts.filter(product => productIds.includes(product._id));
    products = this.marksFavoritesProducts(products);
    return this.relatedProductsObservable.next(products);
  }

  getProductsByIds(ids) {
    let products : any = this.allProducts.filter(product => ids.includes(product._id));
    products = this.marksFavoritesProducts(products);
    return this.productsByIdsObservable.next(products);
  }

  getFavorites() {
    const ids = this.favoritesService.getFavoritesIds();
    let products : any = this.allProducts.filter(product => ids.includes(product._id));
    products = this.marksFavoritesProducts(products);
    return this.favoritesObservable.next(products);
  }

}
