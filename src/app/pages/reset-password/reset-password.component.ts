import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  async recoverPassword() {
    console.log('Email => ', this.email);
    const response = await this.apiService.passwordForgot(this.email);
    console.log('Response => ', response);
  }
}
