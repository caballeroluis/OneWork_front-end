import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { StateStoreService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    public stateSS: StateStoreService
  ) { }

  ngOnInit () {
    this.router.events.subscribe(event => {
        if (event instanceof RouteConfigLoadStart) {
            this.stateSS.userInterface.showLoader = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.stateSS.userInterface.showLoader = false;
        }
    });
  }

}
