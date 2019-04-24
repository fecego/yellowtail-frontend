import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService) {

  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  login(loginForm: any) {
    console.log(loginForm);
    const credentials = loginForm.form.value;
    this.authService.login(credentials);
    this.activeModal.close('Modal Closed');
  }

}
