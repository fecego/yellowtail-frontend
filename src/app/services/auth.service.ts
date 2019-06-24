import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LoadingService } from './loading.service';
import { FavoritesService } from './favorites.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInObservable = new BehaviorSubject<boolean>(false);

  private isLoggedIn: boolean;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private loadingService: LoadingService,
              private favoritesService: FavoritesService,
              private localStorageService: LocalStorageService) {

    this.initUserData();
  }

  initUserData() {
    const user = this.getLocalUser();
    this.isLoggedIn = !!user;
    this.loggedInObservable.next(this.isLoggedIn);

    if (this.isLoggedIn) {
      this.favoritesService.initFavorites(['5']);
    }
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
      this.favoritesService.initFavorites(['5']);
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
    this.localStorageService.saveValue(LocalStorageService.KEY_USER, user);
  }

  getLocalUser() {
    return this.localStorageService.getValue(LocalStorageService.KEY_USER);
  }

  deleteUser() {
    this.localStorageService.deleteValue(LocalStorageService.KEY_USER);
  }

}
