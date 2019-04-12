import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
