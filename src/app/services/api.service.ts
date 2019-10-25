import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://54.218.183.6:8080/yellowtailws/api';

  constructor(private http: HttpClient) {

  }

  getUrl(endpoint: String) {
    const apiKey = 'abc12345';
    return `${this.baseUrl}/${endpoint}?api-key=${apiKey}`
  }

  login() {
    const url = this.getUrl('login');
    return this.http.get(url).toPromise();
  }

  register(heroData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    const url = this.getUrl('register');
    console.log('Url => ', url);
    console.log('Data => ', heroData);

    const data = JSON.stringify(heroData);
    const promise = this.http.post(url, data, httpOptions).toPromise();
    console.log('Promise => ', promise);
    return promise;
  }
}
