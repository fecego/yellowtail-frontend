import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.css']
})
export class TrophiesComponent implements OnInit {

  trophies: Array<any>;
  showingChart: string;

  constructor() {
    this.showingChart = "";
  }

  ngOnInit() {
    this.trophies = this.getTrophies();    
  }

  showChart(_id: string) {
    console.log('Show chart ', _id);
    this.showingChart = _id;
  }

  getTrophies() {
    const trophies = [
      {
        _id: '1',
        classes: [
          'grid-item--width6',
          'grid-item--height6'
        ],
        images: [
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg'
        ]
      },
      {
        _id: '2',
        classes: [
          'grid-item--width4',
          'grid-item--height4'
        ],
        images: [
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg'
        ]
      },
      {
        _id: '3',
        classes: [
          'grid-item--width4',
          'grid-item--height2'
        ],
        images: [
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg'
        ]
      },
      {
        _id: '4',
        classes: [
          'grid-item--width4',
          'grid-item--height5'
        ],
        images: [
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg'
        ]
      },
      {
        _id: '5',
        classes: [
          'grid-item--width6',
          'grid-item--height5'
        ],
        images: [
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/submerged.jpg'
        ]
      }
    ];

    return trophies.map( (trophy: any) => {
      trophy.mainImage = trophy.images[0];
      trophy.classes.push('grid-item');
      const classesString = trophy.classes.join(' ');
      trophy.classesString = classesString;
      return trophy;
    });
  }

}
