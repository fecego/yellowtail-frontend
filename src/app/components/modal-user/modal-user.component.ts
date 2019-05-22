import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  nextRoute: string;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService) {
    this.nextRoute = '/';
  }

  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  login(loginForm: any) {
    console.log(loginForm);
    const credentials = loginForm.form.value;
    this.authService.login(credentials, this.nextRoute);
    this.activeModal.close('Modal Closed');
  }

  register(registerForm: NgForm) {
    console.log(registerForm);
    const credentials = registerForm.form.value;
    this.authService.login(credentials, this.nextRoute);
    this.activeModal.close('Modal Closed');
  }

  showTab(tab: string, nextRoute?: string) {
    this.nextRoute = nextRoute;
    setTimeout( () => {
      $(`.nav-tabs a[href="#${tab}"]`).tab('show'); 
    }, 100);
  }

}
