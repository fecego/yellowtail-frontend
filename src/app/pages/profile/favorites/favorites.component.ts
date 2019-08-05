import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  productsFavoritesObservable: Observable<Array<any>>;

  showNoProcuts: boolean;
  favoriteProducts: any;

  constructor(private productsService: ProductsService) {
    this.productsFavoritesObservable = this.productsService.getFavoritesObservable();
  }

  ngOnInit() {
    this.productsFavoritesObservable.subscribe(
      products => this.initFavorites(products),
      error => console.log(error)
    );
    this.productsService.getFavorites();
  }

  initFavorites(products) {
    this.favoriteProducts = products;
    this.showNoProcuts = this.favoriteProducts.length == 0;
  }

}
