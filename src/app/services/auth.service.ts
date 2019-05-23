import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { resolve } from 'dns';

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

  async login(credentials: any, nextRoute?: any) {
    if (!nextRoute) {
      nextRoute = '/';
    }
    
    console.log('Login');
    const response = await this.checkEnpointLogin(credentials);
    console.log(response);
    /*
    if (credentials.email !== '' && credentials.password !== '' ) {
      this.isLoggedIn = true;
      this.loggedInObservable.next(true);
      this.router.navigate([nextRoute]);
    }
    */
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

  checkEnpointLogin(credentials) {

    return new Promise( (resolve, reject) => {
      setTimeout( () => {

        if ( credentials.email !== 'test@test.com' && credentials.password !== 'Password1' ) {
          
          resolve ({
            success: true,
            user: {
              _id: 'abcd',
              name: 'Irving',
              lastName: 'Gonzalez',
              email: 'test@test.com',
              favorites: [
              ]
            }
          });

        } else {

          resolve({
            success: false
          });

        }

      }, 5000);

    });

  }

}
