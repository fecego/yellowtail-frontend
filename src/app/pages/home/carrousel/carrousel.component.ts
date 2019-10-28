import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { SearchbarService } from '../../../services/searchbar.service';
@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  items: Array<any>;

  constructor(public el: ElementRef,
              private searchbarService: SearchbarService) {
    this.items = [];
    searchbarService.setSearchBarVisibility(false);
  }

  ngOnInit() {
    this.searchbarService.setSearchBarVisibility(false);
    this.items = this.getItems();
  }

  getItems() {
    const items = [
      {
        image: '/assets/img/carrousel/Banner-1.png',
      },
      {
        image: '/assets/img/carrousel/Banner-2.png',
      },
      {
        image: '/assets/img/carrousel/Banner-3.png'
      }
    ];
    return items.map( (item: any, index: number) => {
      item.class = index == 0? 'active': '';
      return item;
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const showBar = (scrollPosition >= componentPosition);
    this.searchbarService.setSearchBarVisibility(showBar);
  }

}
