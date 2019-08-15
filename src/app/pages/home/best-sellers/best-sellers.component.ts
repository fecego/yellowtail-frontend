import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit {

  productsObservable: Observable<Array<any>>;
  products: Array<any>;

  constructor(private productsService: ProductsService) {
    this.productsObservable = productsService.getNewProductsObservable();
  }

  ngOnInit() {
    console.log('Initing component');
    this.productsObservable.subscribe(
      products => { this.products = products; },
      error => console.log('Error')
    );

    this.productsService.getNewProducts();
  }

}
