import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingObservable = new BehaviorSubject<boolean>(false);

  constructor() {
    
  }

  getLoadingObservable() {
    return this.loadingObservable;
  }

  setLoading(isLoading: boolean, mesage?: string) {
    this.loadingObservable.next(isLoading);
  }

}
