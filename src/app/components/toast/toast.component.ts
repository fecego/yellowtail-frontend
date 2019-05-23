import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from './../../services/notifications.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  private dataObservable: Observable<any>;

  time: number;
  title: string;
  message: string;

  constructor(private notificationsService: NotificationsService) {
    this.dataObservable = this.notificationsService.getDataObservable();
    this.title = "";
    this.message = "";
  }

  ngOnInit() {
    this.dataObservable.subscribe(
      data => this.newDataReceived(data),
      error => console.log(error)
    );
  }

  newDataReceived(data) {
    console.log('Data received => ', data);
    if (!data) return;
    this.title = data.title;
    this.message = data.message;
  }



}
