import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  showResults: Boolean;
  results: Array<any>;

  constructor() {
    this.showResults = false;
  }

  ngOnInit() {
    this.results = [
      {
        name: 'Kayak niño 1',
        image: 'https://s7d2.scene7.com/is/image/SS/20705_29407_1?$256$',
        price: 400
      },
      {
        name: 'Kayak 2',
        image: 'https://s7d2.scene7.com/is/image/SS/27415_29460_1?$256$',
        price: 800
      }
    ]
  }

  onSearchChange(value: String) {
    console.log(value, value.length);
    if (value.length > 5) {
      this.showResults = true;
    } else {
      this.showResults = false;  
    }
  }



}
