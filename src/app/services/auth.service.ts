import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInObservable = new BehaviorSubject<boolean>(false);

  private isLoggedIn: boolean;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private loadingService: LoadingService) {

    const user = this.getLocalUser();
    this.isLoggedIn = !!user;
    this.loggedInObservable.next(this.isLoggedIn);
  }

  async login(credentials: any, nextRoute?: any) {
    if (!nextRoute) {
      nextRoute = '/';
    }
    
    console.log('Login');
    this.loadingService.setLoading(true);
    const response: any = await this.checkEnpointLogin(credentials);
    console.log(response);

    this.isLoggedIn = response.success;
    this.loggedInObservable.next(response.success);
    if (response.success) {
      const user = response.user;
      this.saveLocalUser(user);
      this.router.navigate([nextRoute]);
    } else {
      //Mensaje de datos erroneos
    }

    this.loadingService.setLoading(false);
  }

  logout() {
    this.deleteUser();
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
    console.log('Endpoint => ', credentials);

    return new Promise( (resolve, reject) => {
      setTimeout( () => {

        if ( credentials.email == 'test@test.com' && credentials.password == 'Password1' ) {
          
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

      }, 2000);

    });

  }

  saveLocalUser(user: object) {
    const USER_KEY = 'user';
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getLocalUser() {
    const USER_KEY = 'user';
    const userString = localStorage.getItem(USER_KEY);
    return JSON.parse(userString);
  }

  deleteUser() {
    const USER_KEY = 'user';
    localStorage.removeItem(USER_KEY);
  }

}
