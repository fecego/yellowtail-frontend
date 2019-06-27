import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private dataObservable = new BehaviorSubject<any>(null);

  constructor() {

  }

  getDataObservable() {
    return this.dataObservable;
  }

  addProductToCart(product: any) {
    this.dataObservable.next({
      title: 'Carrito',
      message: `${product.name} fue agregado al carrito`,
    });
    $('#toastContainer').show();
    $('.toast').toast('show');
  }

  addProductsToCart(products: any) {
    const message = products.map(product => {
      return ` <p>${product.name}</p> `;
    });
    this.dataObservable.next({
      title: 'Carrito',
      message: `${message} fueron agregados al carrito`,
    });
    $('#toastContainer').show();
    $('.toast').toast('show');
  }

  showError(error: string) {
    $('.toast').toast('show');
    $('#toastContainer').show();
  }

}
