import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

  private selectedProductObservable: Observable<any>;

  product: any;

  constructor(public activeModal: NgbActiveModal,
              private productsService: ProductsService) {
    this.selectedProductObservable = this.productsService.getSelectedProductObservable();
  }

  ngOnInit() {
    this.selectedProductObservable.subscribe(
      product => this.product = product,
      error => console.log(error)
    );
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  getImages() {
    return this.product.images.map((image, index) => {
      return {
        image: image,
        activeClass: ( index == 0? 'active': '' )
      }
    });
  }

}
