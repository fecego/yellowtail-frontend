import { Component, OnInit } from '@angular/core';
import * as Parallax from 'parallax-js';

declare var Parallax: any;

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const scene = document.getElementById('scene');
    const scene2 = document.getElementById('scene2');
    const scene3 = document.getElementById('scene3');
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true
    });
    const parallaxInstance2 = new Parallax(scene2, {
      relativeInput: true
    });
    const parallaxInstance3 = new Parallax(scene3, {
      relativeInput: true
    });
  }

}
