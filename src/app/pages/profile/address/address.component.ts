import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addresses: any;
  showNewAddress: boolean;

  constructor() {
    this.showNewAddress = false;
  }

  ngOnInit() {
    const addresses = [{_id:1},{_id:2}];
    this.addresses = addresses.map(( address: any ) => {
      address.edit = false;
      return address;
    });
  }

  clickEdit(editAddress) {
    this.addresses = this.addresses.map((address: any) => {
      if (address._id == editAddress._id) {
        address.edit = true;
      }
      return address;
    });
  }

  cancelEdit(editAddress) {
    this.addresses = this.addresses.map((address: any) => {
      if (address._id == editAddress._id) {
        address.edit = false;
      }
      return address;
    });
  }

  clickNewAddress() {
    this.showNewAddress = true;
  }

  cancelNewAddress() {
    this.showNewAddress = false; 
  }

}
