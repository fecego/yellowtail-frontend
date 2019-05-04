import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInObservable = new BehaviorSubject<boolean>(false);

  private isLoggedIn: boolean;
  
  constructor(private router: Router) {
    this.isLoggedIn = false;
  }

  login(credentials: any){
    if (credentials.email !== '' && credentials.password !== '' ) {
      this.isLoggedIn = true;
      this.loggedInObservable.next(true);
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.loggedInObservable.next(false);
    this.router.navigate(['/home']);
  }

  getLoggedInObservable() {
    return this.loggedInObservable;
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }

}
