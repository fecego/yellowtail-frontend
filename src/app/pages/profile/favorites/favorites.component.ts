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

  favoriteProducts: any;

  constructor(private productsService: ProductsService) {
    this.productsFavoritesObservable = this.productsService.getFavoritesObservable();
  }

  ngOnInit() {
    this.productsFavoritesObservable.subscribe(
      products => this.favoriteProducts = products,
      error => console.log(error)
    );
    this.productsService.getFavorites();
  }

}
