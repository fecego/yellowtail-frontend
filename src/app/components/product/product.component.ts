import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalProductComponent } from './../../components/modal-product/modal-product.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  quantity: number;

  constructor(private modalService: NgbModal) {
    this.quantity = 0;
  }

  ngOnInit() {
  }

  openProductModal() {
    const modalRef = this.modalService.open(ModalProductComponent);
    
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
    
  }

  addQuantity() {
    this.quantity++;
  }

  subtractQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

}
