import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritesObservable = new BehaviorSubject<Array<string>>([]);
  favorites: Array<string>;

  constructor() {
    this.favorites = [];
  }

  getFavoritesObservable() {
    return this.favoritesObservable;
  }

  initFavorites(favorites: Array<string>) {
    this.favorites = favorites;
    this.favoritesObservable.next(this.favorites);
  }

  getFavoritesIds() {
    return this.favorites;
  }

  markAsFavorite(productId: string) {
    this.favorites.push(productId);
    this.favoritesObservable.next(this.favorites);
  }

  unmarkFavorite(productId: string) {
    this.favorites = this.favorites.filter(favorite => favorite != productId);
    this.favoritesObservable.next(this.favorites);
  }

}
