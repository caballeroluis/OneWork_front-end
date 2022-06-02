import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  host?: string;

  constructor( ) { }
  
  ngAfterViewInit() {
    this.host = window.location.host;
  }

}
