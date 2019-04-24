import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';

import { ModalUserComponent } from './../modal-user/modal-user.component';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Observable<boolean>; 

  constructor(private modalService: NgbModal,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isLoggedIn.subscribe(
      x => console.log('Observer got a next value: ' + x),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

  openFormModal(tab: string) {
    console.log('Open => ', tab);
    this.modalService.open(ModalUserComponent); 
    setTimeout( () => {
      $('.nav-tabs a[href="#' +  tab + '"]').tab('show'); 
    }, 100);
  }

  logout(){
    this.authService.logout();
  }

}
