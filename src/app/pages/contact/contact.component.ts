import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  mapVeracruz: google.maps.Map;

  @ViewChild('mmap') mmapElement: any;
  mapMerida: google.maps.Map;

  contactForm: any;

  constructor() {
    this.contactForm = {
      name: '',
      email: '',
      message: ''
    };
  }

  ngOnInit() {
    const propsMerida = {
      center: new google.maps.LatLng(21.0257935, -89.6063063),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const propsVeracruz = {
      center: new google.maps.LatLng(20.1889494, -96.8684576),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapMerida = new google.maps.Map(this.gmapElement.nativeElement, propsMerida);
    this.mapVeracruz = new google.maps.Map(this.mmapElement.nativeElement, propsVeracruz);

    let locationMerida = new google.maps.LatLng(21.0257935, -89.6063063);
    new google.maps.Marker({
      position: locationMerida,
      map: this.mapMerida,
      title: 'Yellowtail Merida'
    });

    let locationVeracruz = new google.maps.LatLng(20.1889494, -96.8684576);
    new google.maps.Marker({
      position: locationVeracruz,
      map: this.mapVeracruz,
      title: 'Yellowtail Veracruz'
    });
  }

  sendForm() {

  }

}
