import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  items: Array<any>;

  constructor() {
    this.items = [];
  }

  ngOnInit() {
    this.items = this.getItems();
  }

  getItems() {
    const items = [
      {
        image: '/assets/img/carrousel/1a.jpg',
      },
      {
        image: '/assets/img/carrousel/2aa.jpg',
      },
      {
        image: '/assets/img/carrousel/3aa.jpg'
      }
    ];
    return items.map( (item: any, index: number) => {
      item.class = index == 0? 'active': '';
      return item;
    });
  }

}
