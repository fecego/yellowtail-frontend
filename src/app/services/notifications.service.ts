import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() {

  }

  addProductToCart(product: any) {
    $('#toastContainer').show();
    $('.toast').toast('show');
  }

  showError(error: string) {
    $('.toast').toast('show');
    $('#toastContainer').show();
  }

}
