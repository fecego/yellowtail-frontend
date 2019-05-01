import { Component, OnInit, Input } from '@angular/core';

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

}
