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
      filters: [
        {
          key: 'accesorios_A',
          value: 'Argolla doble'
        },
        {
          key: 'accesorios_B',
          value: 'Argolla sólida'
        },
        {
          key: 'accesorios_C',
          value: 'Assist hook'
        },
        {
          key: 'accesorios_D',
          value: 'Jig head'
        },
        {
          key: 'accesorios_E',
          value: 'Destorcedor'
        },
        {
          key: 'accesorios_F',
          value: 'Grapas'
        },
        {
          key: 'accesorios_G',
          value: 'Ochos para assist'
        },
        {
          key: 'accesorios_H',
          value: 'Montaje de pared para portacañas'
        },
        {
          key: 'accesorios_I',
          value: 'Portacañas'
        },
        {
          key: 'accesorios_J',
          value: 'Snaps con destorcedor'
        },
        {
          key: 'accesorios_K',
          value: 'Sujetador de labio'
        }
      ]
    },
    canas: {
      name: 'Cañas',
      key: 'canas',
      image: '/assets/img/categorias/canas.png',
      filters: [
        {
          key: 'canas_A',
          value: 'Spinning',
          subfilter: [
            {
              key: 'canas_A_1',
              value: 'Senna'
            },
            {
              key: 'canas_A_2',
              value: 'Chapala'
            }
          ]
        },
        {
          key: 'canas_B',
          value: 'Surf',
          subfilter: [
            {
              key: 'canas_B_1',
              value: 'Kapalua'
            },
            {
              key: 'canas_B_2',
              value: 'Tulum'
            }
          ]
        },
        {
          key: 'canas_C',
          value: 'Slow jigging',
          subfilter: [
            {
              key: 'canas_C_1',
              value: 'Casitas'
            },
            {
              key: 'canas_C_2',
              value: 'Holbox'
            }
          ]
        },
        {
          key: 'canas_D',
          value: 'Jigging',
          subfilter: [
            {
              key: 'canas_D_1',
              value: 'Tortuga'
            },
            {
              key: 'canas_D_2',
              value: 'Yellow Devil'
            },
            {
              key: 'canas_D_3',
              value: 'Lobos'
            },
            {
              key: 'canas_D_4',
              value: 'Maui'
            },
            {
              key: 'canas_D_5',
              value: 'Alacranes'
            },
            {
              key: 'canas_D_6',
              value: 'Caimanes'
            }
          ]
        },
        {
          key: 'canas_E',
          value: 'Popping',
          subfilter: [
            {
              key: 'canas_E1',
              value: 'YT popping'
            }
          ]
        },
        {
          key: 'canas_F',
          value: 'Trolling',
          subfilter: [
            {
              key: 'canas_F_1',
              value: 'Fiji'
            },
            {
              key: 'canas_F_2',
              value: 'Hilo'
            },
            {
              key: 'canas_F_2',
              value: 'Kona'
            },
            {
              key: 'canas_F_4',
              value: 'Oahu'
            }
          ]
        }
      ]
    },
    carretes: {
      name: 'Carretes',
      key: 'carretes',
      image: '/assets/img/categorias/carretes.png',
      filters: [
        {
          key: 'carretes_A',
          value: 'Spinning',
          subfilter: [
            {
              key: 'carretes_A_1',
              value: 'Coronado'
            },
            {
              key: 'carretes_A_2',
              value: 'Sea Raven'
            },
            {
              key: 'carretes_A_3',
              value: 'Stingray'
            },
            {
              key: 'carretes_A_4',
              value: 'Torito'
            }
          ]
        },
        {
          key: 'carretes_B',
          value: 'Casting',
          subfilter: [
            {
              key: 'carretes_B_1',
              value: 'Silver King'
            }
          ]
        },
      ]
    },
    combos: {
      name: 'Combos',
      key: 'combos',
      image: '/assets/img/categorias/',
      filters: []
    },
    kayaks: {
      name: 'Kayaks',
      key: 'kayaks',
      image: '/assets/img/categorias/kayaks.png',
      filters: [
        {
          key: 'kayaks_A',
          value: 'Individual'
        },
        {
          key: 'kayaks_B',
          value: 'Doble'
        },
        {
          key: 'kayaks_C',
          value: 'Pesca'
        },
        {
          key: 'kayaks_D',
          value: 'Asiento'
        },
        {
          key: 'kayaks_E',
          value: 'Remos'
        }
      ]
    },
    lineas: {
      name: 'Lineas',
      key: 'lineas',
      image: '/assets/img/categorias/lineas.png',
      filters: [
        {
          key: 'lineas_A',
          value: 'Monofilamento'
        },
        {
          key: 'lineas_B',
          value: 'Trenzada'
        }
      ]
    },
    senuelos: {
      name: 'Señuelos',
      key: 'senuelos',
      image: '/assets/img/categorias/senuelos.png',
      filters: [
        {
          key: 'senuelos_A',
          value: 'Bucktail'
        },
        {
          key: 'senuelos_B',
          value: 'Jigs'
        },
        {
          key: 'senuelos_C',
          value: 'Pulpos'
        }
      ]
    }
  };

  productsObservable: Observable<Array<any>>;

  name: string;
  image: string;
  filtersGroups: Array<any>;
  products: Array<any>;
  sortBy: string;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService) {
    this.productsObservable = this.productsService.getProductsByCategoryObservable();
    this.sortBy = '';
    this.name = '';
    this.image = '';
    this.filtersGroups = [];
  }

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get("category")
    console.log('Category => ', category);
    const categoryInfo = this.CATEGORIES_INFO[category];
    this.name = categoryInfo? categoryInfo.name: 'No existe';
    this.image = categoryInfo? categoryInfo.image: '';
    this.filtersGroups = categoryInfo.filters.reduce((accum, filter) => {
      accum[0].options.push(filter);
      return accum;
    }, [{ options: [], level: 0 }]);

    console.log(this.filtersGroups);

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

  changeFilter(event, level) {
    const newOption = event.target.value;
    console.log('New option => ', newOption);
    console.log('Level => ', level );

    if (level == 0) {

      if (this.filtersGroups.length > 1) {
        //Si ya tenia un subfiltro quitarlo
        this.filtersGroups.pop();
      }

      const allOptions = this.filtersGroups[level].options;
      const selectedOption = allOptions.find( option => option.key == newOption );
      if (selectedOption.subfilter && selectedOption.subfilter.length > 0) {
        const newFilter = selectedOption.subfilter.reduce((accum, filter) => {
          accum.options.push(filter);
          return accum;
        }, { options: [], level: 1 });
        this.filtersGroups.push(newFilter);
      }
      
    }

  }

}
