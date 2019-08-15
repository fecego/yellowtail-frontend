import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {

  currentCategory: String;

  constructor() {
    this.currentCategory = 'Categorias';
  }

  ngOnInit() {
  }

  overCategory(category) {
    this.currentCategory = category;
  }

  leaveCategory() {
    this.currentCategory = 'Categorias';
  }

}
