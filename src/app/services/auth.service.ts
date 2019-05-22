import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInObservable = new BehaviorSubject<boolean>(false);

  private isLoggedIn: boolean;
  
  constructor(private router: Router,
    private route: ActivatedRoute) {
    this.isLoggedIn = false;
  }

  login(credentials: any, nextRoute?: any){
    if (!nextRoute) {
      nextRoute = '/';
    }
    console.log('nextRoute ', nextRoute);

    if (credentials.email !== '' && credentials.password !== '' ) {
      this.isLoggedIn = true;
      this.loggedInObservable.next(true);
      this.router.navigate([nextRoute]);
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
