import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

import data from './questions.json';

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
    const renderFaqs = data.faqs.map((faq, index) => {
      faq.index = index;
      faq.show = false;
      return faq;
    });
    this.faqs = renderFaqs;
    console.log(this.faqs);
  }

  ngOnInit() {

  }

  toggle(index) {
    console.log(index);
    const faq = this.faqs[index];
    faq.show = !faq.show;
    this.faqs[index] = faq;
  }

}
