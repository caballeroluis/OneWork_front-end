import { Component } from '@angular/core';

@Component({
  selector: 'app-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.scss']
})
export class UseComponent {

  ownerMail?: string = 'fakeemail@example.com';

  constructor( ) { }

}
