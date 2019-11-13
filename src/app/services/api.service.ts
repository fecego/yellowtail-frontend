import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = '/api/yellowtailws/api';

  constructor(private http: HttpClient) {

  }

  getUrl(endpoint: String) {
    const apiKey = 'abc12345';
    return `${this.baseUrl}/${endpoint}?api-key=${apiKey}`
  }

  postApi(url: string, json: any) {
    console.log('Url POST => ', url);
    console.log('Data POST => ', json);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    const data = JSON.stringify(json);
    console.log('POST DATA => ', data);
    const promise = this.http.post(url, data, httpOptions).toPromise();
    console.log('Promise => ', promise);
    return promise;
  }

  getApi(url: string, queryParams?: any) {
    let urlWithParams = url;
    if (queryParams) {
      const params = Object.keys(queryParams).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]);
      }).join('&');
      urlWithParams = `${urlWithParams}&${params}`;
    }
    console.log('Url GET => ', urlWithParams);
    const promise = this.http.get(urlWithParams).toPromise();
    console.log('Promise => ', promise);
    return promise;
  }

  login(loginData) {
    const url = this.getUrl('login');
    return this.postApi(url, loginData);
  }

  register(registerData: any) {
    const url = this.getUrl('register');
    return this.postApi(url, registerData);
  }

  profile(userId) {
    const endpoint = `profile/${userId}`;
    const url = this.getUrl(endpoint);
    return this.getApi(url);
  }

  sha(shaData) {
    const url = this.getUrl('sha');
    return this.getApi(url, shaData);
  }

  passwordRecover(recoverData: any) {
    const url = this.getUrl('password/recover');
    return this.postApi(url, recoverData);
  }

  passwordForgot(email: string) {
    const url = this.getUrl('password/forgot');
    const json = {
      email,
    };
    return this.postApi(url, json);
  }

  getProducts() {

  }

  searchProducts(query: string) {
    const url = this.getUrl('products');
    const queryParams = {
      search: query,
    };
    return this.getApi(url, queryParams);
  }

  getProductsByCategory(category: string) {
    const url = this.getUrl('products');
    const queryParams = {
      category,
    };
    return this.getApi(url, queryParams);
  }

  getTrophies() {
    const url = this.getUrl('trophies');
    return this.getApi(url);
  }

}
