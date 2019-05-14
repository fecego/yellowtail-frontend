import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  showLoading: boolean;
  showNoResuls: boolean;
  products: Array<any>;
  productsByQueryObservable: Observable<Array<any>>;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute) {
    this.showLoading = true;
    this.showNoResuls = true;
    this.products = [];
    this.productsByQueryObservable = this.productsService.getProductByQueryObservable();
  }

  ngOnInit() {
    const query = this.route.snapshot.queryParamMap.get("query");
    console.log('Query => ', query);

    this.productsByQueryObservable.subscribe(
      products => this.newProductsFounded(products),
      error => console.log(error)
    );

    this.productsService.getProductsByQuery(query);
    this.showLoading = true;
  }

  newProductsFounded(products) {
    console.log('Products found => ', products);
    this.products = products
    this.showLoading = false;
    this.showNoResuls = this.products.length == 0;
  }

}
