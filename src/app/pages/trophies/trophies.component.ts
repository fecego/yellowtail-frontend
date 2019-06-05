import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.css']
})
export class TrophiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const $grid = $('.grid').imagesLoaded( function() {

      $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
      }); 

    });  
    
  }

}
