import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  @Input()
  user: any;

  showEdit: boolean;
  profile: any;

  constructor() {
    this.showEdit = false;
    this.profile = {};
  }

  ngOnInit() {
    if (this.user) {
      this.profile = {
        name: this.user.name,
        lastName: this.user.lastName,
        fullname: `${this.user.name} ${this.user.lastName}`,
        email: this.user.email,
        phone: this.user.phone,
        birthday: this.user.birthday,
        gender: this.user.gender
      };

      if ( this.user.gender == 'H' || this.user.gender == 'M' ) {
        this.profile.displayGender = ( this.user.gender == 'H'?'Hombre': 'Mujer' );
      } else {
        this.profile.displayGender = '-';
      }
      console.log('Final profile => ', this.profile);
    }
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
