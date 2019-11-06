import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LoadingService } from './loading.service';
import { FavoritesService } from './favorites.service';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';

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
              private localStorageService: LocalStorageService,
              private apiService: ApiService) {

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
    let responseLogin: any = { success: false, message: 'Error al inciar sesion'};
    
    try {
      responseLogin = await this.apiService.login(credentials);
    } catch(error1) {
      return;
    }

    console.log('RL => ', responseLogin);

    if (!responseLogin.succes) {
      this.loadingService.setLoading(false);
      return responseLogin;
    }

    let responseProfile: any = { success: false, message: 'Error al obtener tú perfil'};
    try {
      const userId = responseLogin.data._id;
      console.log('User id => ', userId);
      responseProfile = await this.apiService.profile(userId);
    } catch(error1) {
      return responseProfile;
    }

    console.log('RP => ', responseProfile);

    if (!responseProfile.success) {
      return responseProfile;
    }

    // Obtuvo los datos, mezclarlos
    const user = Object.assign(responseLogin.data, responseProfile.data);
    console.log('Usuario mezclado => ', user);

    this.isLoggedIn = true;
    this.loggedInObservable.next(true);

    this.saveLocalUser(user);
    this.favoritesService.initFavorites(user.favorites);
    this.router.navigate([nextRoute]);

    this.loadingService.setLoading(false);
  }

  async register(data: any) {
    console.log('Register');
    this.loadingService.setLoading(true);
    
    let response: any = { success: false };
    try {
      response = await this.apiService.register(data);
      console.log('Response en try => ', response);
    } catch(error) {
      console.log('Error 1 => ', error);
      this.loadingService.setLoading(false);
      response.message = '' + error;
      return response;
    }

    console.log(response);

    // this.isLoggedIn = response.success;
    // this.loggedInObservable.next(response.success);
    // if (response.success) {
    //} else {
      //Mensaje de datos erroneos
    //}

    this.loadingService.setLoading(false);
    return response;
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
              name: 'Alejandro',               //Nombres
              lastName: 'Dumas',           //Apellidos
              email: 'test@test.com',              //Email
              gender: 'H',             //Genero H/M
              phone: '5533466083',              //Telefono
              birthday: '01/01/1990',           //Fecha de nacimiento
              favorites: [],
              address: [                  //Arreglo de direcciones      
                {
                  _id: 'asdasd',            //ID de direccion
                  street: 'Calle 5',         //Calle
                  number: 'Interiro 78',         //Numero
                  neighborhood: 'Alamos del norte',   //Colonia
                  state: 'Ciudad de México',          //Estado
                  country: 'México',        //Pais
                  cp: '08789',             //Codigo Postal
                  reference: 'Atras de un Walmart',      //Referencia
                  contact: 'Alex Market',         //Nombre de contacto
                  phone: '5534567890',           //Telefono
                  default: true         //Si es su direccion por default
                }
              ],
              taxInformation: {
                required: true,         //Si requiere factura
                legalName: 'Alejandro Dumas SA. CV',        //Razon social,
                rfc: 'ADSA890765D34',              //RFC
                address: {
                  street: 'Calle 5',         //Calle
                  number: 'Interiro 78',         //Numero
                  neighborhood: 'Alamos del norte',   //Colonia
                  state: 'Ciudad de México',          //Estado
                  country: 'México',        //Pais
                  cp: '08789'             //Codigo Postal
                }
              },
              payments: [
                {
                  _id: 'asdasd',             //Id de la forma de pago
                  token: 'asdasdhjgafsdjhgasd',          //Token de la forma de pago
                  method: 'Tarjeta de credito',         //Metodo de pago
                  text: '9089',           //Texto, por ejemplo los ultimos 4 digitos de tarjeta
                },
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
