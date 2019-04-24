import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {

  }

  login(credentials: any){
    if (credentials.email !== '' && credentials.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}
