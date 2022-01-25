import { Component, DoCheck } from '@angular/core';
import { StateStoreService } from '@core/services';

@Component({
  selector: 'session-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  constructor(
    public stateStoreService: StateStoreService
  ) { }

  ngDoCheck(): void {
    console.log("🚀 ~ SESSION file: header.component.ts ~ line 16 ~ HeaderComponent ~ ngDoCheck ~ ngDoCheck", 'ngDoCheck')
  }

}
