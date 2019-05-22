import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

import { ModalAddressComponent } from './../../components/modal-address/modal-address.component';
import { ModalTaxComponent } from './../../components/modal-tax/modal-tax.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartObservable: Observable<Array<any>>;

  showTaxContainer: boolean;
  products: Array<any>;

  constructor(private modalService: NgbModal,
              private cartService: CartService) {
    this.showTaxContainer = false;
    this.products = [];
    this.cartObservable = this.cartService.getCartObservable();
  }

  ngOnInit() {
    this.cartObservable.subscribe(
      products => { 
        this.products = products;
      },
      error => console.log(error)
    );
  }

  getAddresses() {
    return [
      {
        street: 'Calle A',
        _id: 'C'
      },
      {
        street: 'Calle 67',
        _id: 'D'
      }
    ];
  }

  getPaymentTypes() {
    return [
      {
        name: 'Pago con tarjeta',
        _id: 'B'
      },
      {
        name: 'Pago en efectivo',
        _id: 'BC'
      }
    ];
  }

  getShippingTypes() {
    return [
      {
        name: 'Estafeta',
        _id: 'A'
      }
    ];
  }

  getTaxInformations() {
    return [
      {
        rfc: 'DSAASDA324234SADASD'
      },
      {
        rfc: 'XCVXVCV32434SA3434S'
      }
    ];
  }

  formatAdress(address: any) {
    return `${address.street}`;
  }

  formatTaxInformation(taxInformation: any) {
    return `${taxInformation.rfc}`;
  }

  changeTaxContainer() {
    this.showTaxContainer = !this.showTaxContainer;
  }

  newAddress() {
    this.modalService.open(ModalAddressComponent);
  }

  newTaxInformation() {
    this.modalService.open(ModalTaxComponent);
  }

}
