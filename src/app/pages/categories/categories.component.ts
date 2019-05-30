import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  readonly CATEGORIES_INFO = {
    accesorios: {
      name: 'Accesorios',
      key: 'accesorios',
      image: '/assets/img/categorias/accesorios.png',
    },
    canas: {
      name: 'Cañas',
      key: 'canas',
      image: '/assets/img/categorias/canas.png',
    },
    carretes: {
      name: 'Carretes',
      key: 'carretes',
      image: '/assets/img/categorias/carretes.png',
    },
    combos: {
      name: 'Combos',
      key: 'combos',
      image: '/assets/img/categorias/',
    },
    kayaks: {
      name: 'Kayaks',
      key: 'kayaks',
      image: '/assets/img/categorias/kayaks.png',
    },
    lineas: {
      name: 'Lineas',
      key: 'lineas',
      image: '/assets/img/categorias/lineas.png',
    },
    senuelos: {
      name: 'Señuelos',
      key: 'senuelos',
      image: '/assets/img/categorias/senuelos.png',
    }
  };

  productsObservable: Observable<Array<any>>;

  name: string;
  image: string;
  products: Array<any>;
  sortBy: string;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService) {
    this.productsObservable = this.productsService.getProductsByCategoryObservable();
    this.sortBy = '';
  }

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get("category")
    console.log('Category => ', category);
    const categoryInfo = this.CATEGORIES_INFO[category];
    this.name = categoryInfo? categoryInfo.name: 'No existe';
    this.image = categoryInfo? categoryInfo.image: '';

    this.productsObservable.subscribe(
      products => this.products = products,
      error => console.log(error)
    );

    this.productsService.getProductsByCategory(categoryInfo.key);
  }

  getProducts() {
    if (!this.sortBy) {
      return this.products;
    }
    return this.products.sort(this.getSortFunction());
  }

  sortProducts(event) {
    const newSort = event.target.value;
    this.sortBy = newSort;
  }

  getSortFunction() {
    let sortFunction;
    if (this.sortBy == '1') {
      sortFunction = (a: any, b: any) => a.name.localeCompare(b.name, 'en', { numeric: true });
    } else if (this.sortBy == '2') {
      sortFunction = (a: any, b: any) => a.price - b.price;
    } else if (this.sortBy == '3') {
      sortFunction = (a: any, b: any) => b.price - a.price;
    }
    return sortFunction;
  }

}
