import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  showSearchSection: boolean;
  isSearching: boolean;
  showNoResuls: boolean;
  results: Array<any>;
  productsByQueryObservable: Observable<Array<any>>;

  constructor(private productsService: ProductsService,) {
    this.showSearchSection = false;
    this.isSearching = true;
    this.results = [];
    this.showNoResuls = false;
    this.productsByQueryObservable = this.productsService.getProductByQueryObservable();
  }

  ngOnInit() {
    this.productsByQueryObservable.subscribe(
      products => this.newProductsFounded(products),
      error => console.log(error)
    );
  }

  newProductsFounded(products) {
    console.log('Products found => ', products);
    this.results = products;
    this.isSearching = false;
    this.showNoResuls = this.results.length == 0;
  }

  onSearchChange(value: string) {
    console.log(value, value.length);
    this.isSearching = true;

    if (value.length > 2) {
      this.showSearchSection = true;
      this.productsService.getProductsByQuery(value);
    } else {
      this.showSearchSection = false;  
    }
  }

}
