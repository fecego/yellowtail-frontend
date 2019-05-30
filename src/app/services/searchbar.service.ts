import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  private showSearchBarObservable = new BehaviorSubject<boolean>(true);

  constructor() {

  }

  getSearchBarObservable() {
    return this.showSearchBarObservable;
  }

  setSearchBarVisibility(isVisible) {
    this.showSearchBarObservable.next(isVisible);
  }

}
