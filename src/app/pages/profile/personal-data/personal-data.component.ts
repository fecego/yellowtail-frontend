import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  showEdit: boolean;
  profile: any;

  constructor() {
    this.showEdit = false;
    this.profile = {};
  }

  ngOnInit() {
  }

  clickEdit() {
    this.showEdit = true;
  }

  cancelEdit() {
    this.showEdit = false;
  }

  saveEdit() {
    this.showEdit = false;
  }

}
