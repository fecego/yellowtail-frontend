import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input()
  trophy: any;
  products: Array<any>;

  productsByIdsObservable: Observable<Array<any>>;

  constructor(private productsService: ProductsService) {
    this.products = [];
    this.productsByIdsObservable = this.productsService.getProducsByIdsObservable();
  }

  ngOnInit() {
    this.productsByIdsObservable.subscribe(
      products => this.prepareProducts(products),
      error => console.log(error)
    );

    this.productsService.getProductsByIds(this.trophy.products);
  }

  prepareProducts(products: any) {
    this.products = products.map(product => {
      product.mainImage = product.images[0];
      return product;
    });
  }

}
