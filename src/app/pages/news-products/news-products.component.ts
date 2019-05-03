import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-news-products',
  templateUrl: './news-products.component.html',
  styleUrls: ['./news-products.component.css']
})
export class NewsProductsComponent implements OnInit {

  productsObservable: Observable<Array<any>>;
  products: Array<any>;

  constructor(private productsService: ProductsService) {
    this.productsObservable = productsService.getNewProductsObservable();
  }

  ngOnInit() {
    this.productsObservable.subscribe(
      products => { this.products = products; },
      error => console.log('Error')
    );

    this.productsService.getNewProducts();
  }

}
