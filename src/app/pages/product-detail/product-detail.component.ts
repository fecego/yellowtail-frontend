import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productObservable: Observable<any>;
  product: any;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute) {
    this.productObservable = this.productsService.getProductByUrlObservable();
  }

  ngOnInit() {
    const productUrl = this.route.snapshot.paramMap.get("productUrl");
    console.log(productUrl);

    this.productObservable.subscribe(
      product => this.product = product,
      error => console.log(error)
    );

    this.productsService.getProductByUrl(productUrl);
  }

}
