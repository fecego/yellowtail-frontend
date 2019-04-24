import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  readonly CATEGORIES_INFO = {
    accesorios: {
      name: 'Accesorios'
    },
    canas: {
      name: 'Cañas'
    },
    carretes: {
      name: 'Carretes'
    },
    combos: {
      name: 'Combos'
    },
    kayaks: {
      name: 'Kayaks'
    },
    lineas: {
      name: 'Lineas'
    },
    senuelos: {
      name: 'Señuelos'
    }
  };

  name: String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get("category")
    console.log('Category => ', category);
    const categoryInfo = this.CATEGORIES_INFO[category];
    this.name = categoryInfo? categoryInfo.name: 'No existe';
  }

  getProducts() {
    return [
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ];
  }

}
