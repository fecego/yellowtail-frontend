import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() {

  }

  addProductToCart(product: any) {
    $('.toast').toast('show');
  }

}
