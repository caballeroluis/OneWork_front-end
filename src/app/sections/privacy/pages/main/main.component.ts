import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  hostname?: string;
  owner?: string = 'Luis Caballero';
  ownerMail?: string = 'fakeemail@example.com';

  constructor( ) { }
  
  ngAfterViewInit() {
    this.hostname = window.location.host;
  }

}
