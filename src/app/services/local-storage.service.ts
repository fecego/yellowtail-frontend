import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static KEY_CART = 'CART';
  static KEY_USER = 'USER';

  constructor() { }

  saveValue(key: string, newValue: any) {
    if (typeof newValue != 'string') {
      newValue = JSON.stringify(newValue);
    }
    localStorage.setItem(key, newValue);
  }

  getValue(key: string, defaultValue = null) {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue);
    }
    return defaultValue;
  }

  deleteValue(key: string) {
    localStorage.removeItem(key);
  }

}
