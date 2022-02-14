import { Component } from '@angular/core';
import { StateStoreService } from '@core/services';

@Component({
  selector: 'session-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public stateStoreService: StateStoreService
  ) { }

}
