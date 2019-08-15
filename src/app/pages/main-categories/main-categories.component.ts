import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.css']
})
export class MainCategoriesComponent implements OnInit {

  hover: boolean;

  constructor() {
    this.hover = false;
  }

  ngOnInit() {
  }

}
