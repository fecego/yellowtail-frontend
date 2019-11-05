import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  loginForm: FormGroup;
  loginError: any;

  registerForm: FormGroup;
  registerError: any;

  nextRoute: string;

  loading: boolean;
  generalError: string;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.nextRoute = '/';
    this.generalError = null;
    this.loading = false;
  }

  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.authService.login(credentials, this.nextRoute);
    this.activeModal.close('Modal Closed');
  }

  async submitRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    let closeModal = false;

    const data = this.registerForm.value;
    console.log('Data => ', data);

    this.loading = true;
    this.generalError = null;

    const response: any = await this.authService.register(data);
    this.loading = false;

    if (response.success) {
      console.log('Se registro => ', response);
      closeModal = true;
    } else {
      this.generalError = response.message;
      console.log('No se registro :( => ', response);
    }

    if (closeModal) {
      this.activeModal.close('Modal Closed');
    }
  }

  showTab(tab: string, nextRoute?: string) {
    this.nextRoute = nextRoute;
    setTimeout( () => {
      $(`.nav-tabs a[href="#${tab}"]`).tab('show'); 
    }, 100);
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  get registerControls() {
    return this.registerForm.controls;
  }

}
