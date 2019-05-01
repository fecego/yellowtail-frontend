import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  showResults: Boolean;

  constructor() {
    this.showResults = false;
  }

  ngOnInit() {
  
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
