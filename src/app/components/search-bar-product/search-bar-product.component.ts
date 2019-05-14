import { Component, OnInit, Input } from '@angular/core';
import { formatPrice } from '../../utils/formatUtils';

@Component({
  selector: 'app-search-bar-product',
  templateUrl: './search-bar-product.component.html',
  styleUrls: ['./search-bar-product.component.css']
})
export class SearchBarProductComponent implements OnInit {

  @Input()
  product: any;

  constructor() { }

  ngOnInit() {
  }

  getPrice(price: number) {
    return formatPrice(price);
  }

  getThumbnail(images: Array<string>) {
    return images[0];
  }

}
