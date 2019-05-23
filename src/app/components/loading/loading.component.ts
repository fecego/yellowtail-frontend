import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoadingObservable: Observable<boolean>;

  isLoading: boolean;
  message: string;

  constructor(private loadingService: LoadingService) {
    this.isLoading = false;
    this.message = 'Cargando';
    this.isLoadingObservable = this.loadingService.getLoadingObservable();
  }

  ngOnInit() {
    this.isLoadingObservable.subscribe(
      isLoading => this.isLoading = isLoading,
      error => console.log(error)
    );
  }

}
