import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { LoadingService } from '../../services/loading.service';
import { PurchaseService } from '../../services/purchase.service';

import { formatPrice } from '../../utils/formatUtils';

import { ModalAddressComponent } from './../../components/modal-address/modal-address.component';
import { ModalTaxComponent } from './../../components/modal-tax/modal-tax.component';

declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartObservable: Observable<Array<any>>;

  showTaxContainer: boolean;
  products: Array<any>;
  addresses: Array<any>;
  paymentTypes: Array<any>;
  shippingTypes: Array<any>;
  taxInformations: Array<any>;
  options: any;

  user: any;
  paymentData: any;
  selectedShipping: any;
  selectedDiscount: any;

  dataToGetaway: any;

  constructor(private modalService: NgbModal,
              private cartService: CartService,
              private authService: AuthService,
              private loadingService: LoadingService,
              private purchaseService: PurchaseService) {
    this.showTaxContainer = false;
    this.products = [];
    this.addresses = [];
    this.taxInformations = [];

    this.paymentTypes = this.getPaymentTypes();
    this.shippingTypes = this.getShippingTypes();
    
    this.options = {
      shipping: '',
      address: '',
      payment: '',
      taxInformation: ''
    };
    this.cartObservable = this.cartService.getCartObservable();

    this.user = {
      name: '',
      lastName: '',
      email: '',
      address: [],
    };

    this.paymentData = {
      subtotal: 0,
      deliveryPrice: 0,
      discount: 0,
      total: 0,
    };

    this.dataToGetaway = {
      algorithm: '',
      chargetotal: '',
      currency: 484,
      sha: '',
      txndatetime: '',
    };

    this.selectedShipping = null;
    this.selectedDiscount = null;
  }

  ngOnInit() {
    this.cartObservable.subscribe(
      products => { 
        this.initProducts(products);
      },
      error => console.log(error)
    );


    this.user = this.authService.getLocalUser();
    console.log('User => ', this.user);

    this.addresses = this.user.address;
    this.taxInformations = this.user.taxInformation;
  }

  initProducts(products) {
    this.products = products;
    this.updateFinancialData();
  }

  updateFinancialData() {
    const subtotal = this.products.map(product => {
      return product.price * product.quantity;
    }).reduce((total, current) => total + current);

    this.paymentData.subtotal = subtotal;
    
    if (this.selectedShipping) {
      this.paymentData.deliveryPrice = this.selectedShipping.price;
    }

    if (this.selectedDiscount) {
      this.paymentData.discount = this.selectedDiscount.price;
    }

    const total = subtotal + this.paymentData.deliveryPrice - this.paymentData.discount;
    this.paymentData.total = total;
  }

  getPaymentTypes() {
    return [
      {
        name: 'Pago con tarjeta',
        _id: 'B'
      }
    ];
  }

  getShippingTypes() {
    return [
      {
        name: 'Estafeta',
        _id: 'A',
        price: 50,
      }
    ];
  }

  formatAdress(address: any) {
    return `${address.street} ${address.number}, ${address.contact}`;
  }

  formatTaxInformation(taxInformation: any) {
    return `${taxInformation.rfc}`;
  }

  changeTaxContainer() {
    this.showTaxContainer = !this.showTaxContainer;
  }

  changeDeliveryMethod(_id) {
    this.selectedShipping = this.shippingTypes.find(shippingType => shippingType._id === _id);
    this.updateFinancialData();
  }

  newAddress() {
    this.modalService.open(ModalAddressComponent, { size: 'lg', centered: true });
  }

  newTaxInformation() {
    this.modalService.open(ModalTaxComponent, { size: 'lg', centered: true });
  }

  async completePurchase() {
    const {shipping, address, payment, taxInformation } = this.options;
    if (!shipping) {
      return alert('Selecciona un metodo de envio');
    }
    
    if (!address) {
      return alert('Selecciona una dirección para el envio');
    }

    if (!payment) {
      return alert('Selecciona el tipo de pago');
    }

    if (this.showTaxContainer && !taxInformation) {
      return alert('Selecciona los datos de facturacion');
    }

    console.log(this.options);
    this.loadingService.setLoading(true);
    const response = await this.purchaseService.getPurchaseData(this.paymentData);
    if (!response.success) {
      return console.log('Error');
    }

    this.dataToGetaway = response.data;
    console.log('DTG => ', this.dataToGetaway);
    setTimeout(() => $('#formPagar').submit(), 200);
  }

  promoCode() {
    console.log('Validación de cupón');
  }

  getPrice(price) {
    return formatPrice(price);
  }

}
