import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {

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
