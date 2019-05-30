import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

import data from './questions.json';
import dataFaqs from '../../utils/faq.js';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class FaqComponent implements OnInit {

  show: Boolean;
  faqs: Array<any>;

  constructor() {
    this.show = false;
    const renderFaqs = dataFaqs.map((faq: any, index: number) => {
      faq.index = index;
      faq.show = false;
      return faq;
    });
    this.faqs = renderFaqs;
  }

  ngOnInit() {
  }

  toggle(index: number) {
    const faq = this.faqs[index];
    faq.show = !faq.show;
    this.faqs[index] = faq;
  }

}
