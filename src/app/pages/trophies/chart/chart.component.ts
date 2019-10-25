import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { NotificationsService } from '../../../services/notifications.service';
import { CartService } from './../../../services/cart.service';
import { formatPrice } from '../../../utils/formatUtils';

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

  constructor(private productsService: ProductsService,
              private notificationsService: NotificationsService,
              private cartService: CartService) {
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
      product.selected = true;
      return product;
    });
  }

  toggleCheckedProduct(event: any, productId: string) {;
    this.products = this.products.map(product => {
      if (product._id == productId) {
        product.selected = event.currentTarget.checked;
      }
      return product;
    });
  }

  addToCart() {
    const selectProducts = this.products.filter(product => product.selected);
    console.log(selectProducts);
    if (selectProducts.length < 1) {
      return;
    }

    this.notificationsService.addProductsToCart(selectProducts);
    selectProducts.forEach(product => {
      const tempProduct = Object.assign({}, product);
      tempProduct.quantity = 1;
      this.cartService.addProductToCart(tempProduct);
    });

  }

  getPrice(price: any) {
    console.log('Price formated = >', formatPrice(price));
    return formatPrice(price);
  }

}
